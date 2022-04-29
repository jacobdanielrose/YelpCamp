# Stage 1
FROM node:16 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

# Stage 2
FROM nginx:latest

EXPOSE 80 443

COPY --from=build-step /app/yelpcamp /usr/share/nginx/html