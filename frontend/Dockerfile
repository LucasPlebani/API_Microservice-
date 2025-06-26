FROM node:18-alpine as build-stage

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build --prod

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d/

# Copie uniquement le contenu du dossier browser (pas le dossier browser lui-même)
COPY --from=build-stage /app/dist/front-micro-service/browser/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
