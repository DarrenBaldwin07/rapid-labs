mod polyfill;

mod ssr;
#[macro_use]
extern crate lazy_static;

use actix_cors::Cors;
use actix_web::middleware::Logger;
use actix_web::{
    http::header::ContentType, web, web::ServiceConfig, App, HttpResponse, HttpServer, HttpRequest,
    middleware
};
use ssr::SsrV8;
use env_logger::Env;
use serde::{Deserialize, Serialize};
use serde_json::{json as RapidJson};

use actix_files::Files;
use actix_web::http::StatusCode;
use std::fs::read_to_string;

// TODO extract this out into config with router impl etc
fn config(cfg: &mut ServiceConfig) {
    cfg.service(
        web::scope("/api")
            .route("/endpoint", web::get().to(hello))
    );
}


#[derive(Serialize, Deserialize, Debug)]
struct JsonObj {
    name: String,
}

async fn hello() -> HttpResponse {
    let data: JsonObj = JsonObj {
        name: String::from("Hello this some Json from an actix web endpoint!!"),
    };

    HttpResponse::Ok()
        .content_type(ContentType::json())
        .json(web::Json(data))
}


async fn spa(req: HttpRequest) -> HttpResponse {
    let todos = RapidJson!([
        {
            "id": 1,
            "is_done": false,
            "title": "Do my laundry"
        },
        {
            "id": 2,
            "is_done": false,
            "title": "Fix bugs"
        },
        {
            "id": 2,
            "is_done": true,
            "title": "Write mor rust code"
        },
    ]);
    let props = format!(
        r##"{{
            "path": "{}",
            "todos": {},
            "context": {{}}
        }}"##,
        req.uri(),
        todos
    );

    let html_source = read_to_string("/Users/JRDarrenbaldwin/Documents/Coding/CincinnatVentures/Scaffold/cv-scaffold-repo/web/dist/client/index.html").expect("Failed to load the resource.");

    let ssr_source = read_to_string("/Users/JRDarrenbaldwin/Documents/Coding/CincinnatVentures/Scaffold/cv-scaffold-repo/web/dist/server/index.js").expect("Failed to load the resource.");
    let js = SsrV8::new(ssr_source, "SSR");
    let server_rendered_html = js.render_to_string(Some(&props));
    let server_rendered_page = html_source.replace("<!--ssr-outlet-->", &server_rendered_html);

    HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body(server_rendered_page)
}


#[allow(dead_code)]
#[actix_web::main]
// Note: actix (like rocket) is multi-threading completely automatically using the max number of CPUs
// available on the system this default can be overrided with the .workers() method (ideally we keep this at around like 4 on cloud run)
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(Env::default().default_filter_or("info"));

    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Compress::default())
            .configure(config)
            .service(Files::new("/assets", "/Users/JRDarrenbaldwin/Documents/Coding/CincinnatVentures/Scaffold/cv-scaffold-repo/web/dist/client/assets/").show_files_listing())
            .service(Files::new("/public", "/Users/JRDarrenbaldwin/Documents/Coding/CincinnatVentures/Scaffold/cv-scaffold-repo/web/dist/client/").show_files_listing())
            .default_service(web::route().to(spa))
            .wrap(Cors::permissive())
            .wrap(Logger::default())
            .wrap(Logger::new("%a %{User-Agent}i")) // this logger is really bad -- we should simply make our own logger middleware
    })
    .bind(("localhost", 8080))?
    .run()
    .await

    // Everytime we trigger hmr we want to reload port 8080 here
}
