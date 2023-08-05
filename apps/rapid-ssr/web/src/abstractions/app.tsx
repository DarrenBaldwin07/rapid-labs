import { StaticRouter } from 'react-router-dom/server';
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { Routes, Route } from "react-router-dom";
import '../styles/index.scss';
import Home from '../pages/index';
import Test from '../pages/test';

// These are abstractions that will later be inside of @Rapid/react (or @Rapid/client depending on name)
export type PageProps = string | undefined;

const RapidApp = (params: string | undefined): string => {
  const initialProps = params ? JSON.parse(params) : {};

  const app: string = renderToString(
    <StaticRouter location={initialProps.path}>
      <Routes>
        <Route index element={<Home {...initialProps}/>} />
        <Route path="/test" element={<Test {...initialProps} />} />
      </Routes>
    </StaticRouter>
  );

  const propsState: string = renderToStaticMarkup(
    <script
        dangerouslySetInnerHTML={{
          __html: `window.__INITIAL_PROPS__ =${JSON.stringify(params).replace(
              /</g,
              '\\u003c'
          )}`,
        }}
    />
  );

  const formattedApp = `
    ${propsState}
    <div id="__rapid">${app}</div>
  `;

  // TODO: we could load in helmet data here etc
  return formattedApp;
};

export default RapidApp;


// This is a an example...
export const useLoaderData = (props: any) => {
  return props
}
