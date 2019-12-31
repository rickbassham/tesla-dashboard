FROM node as build
RUN mkdir /app
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./ /app
RUN npm run build

FROM nginx
RUN mkdir /app
COPY --from=build /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
