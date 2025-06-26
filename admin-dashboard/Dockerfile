# Dockerfile
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Serveur web léger pour servir le dashboard
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html  
EXPOSE 80
