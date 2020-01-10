FROM node:13-stretch as build
RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY ./ /app
RUN npm run build

FROM nginx:1.17
RUN mkdir /app
COPY --from=build /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
