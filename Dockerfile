FROM node:16-alpine as build

# pull in project files
WORKDIR /code/
COPY /web .
# init pnpm
RUN npm install -g pnpm
# install and build for production
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# configure nginx
FROM nginx:alpine

COPY --from=build /code/dist usr/share/nginx/html

EXPOSE 8080

# finally, serve static files on port 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
