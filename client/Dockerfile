# Stage 1
FROM node:16 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

ENV API_URL='http://127.0.0.1:8080'

RUN npm run build --prod

# Stage 2
FROM nginx:latest

EXPOSE 80 443

COPY --from=build-step /app/dist/yelpcamp /usr/share/nginx/html
