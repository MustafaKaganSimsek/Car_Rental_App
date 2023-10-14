# stage 1

FROM node:latest AS node
WORKDIR /app
COPY . .
RUN npm install 
RUN npm run build -prod

# stage 2

FROM nginx:alpine
COPY --from=node /app/dist/web-app /usr/share/nginx/html
EXPOSE 80
