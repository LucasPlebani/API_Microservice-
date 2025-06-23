FROM node:18 as build-stage
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Vérification (optionnelle)
RUN ls -l /app/dist/front-micro-service/browser

FROM nginx:alpine
COPY --from=build-stage /app/dist/front-micro-service/browser /usr/share/nginx/html
EXPOSE 80

# FROM node:18 as build-stage
# WORKDIR /app
# COPY . .
# RUN npm install && npm run build

# # Ajoute une commande pour lister les fichiers après build
# RUN ls -l /app/dist/front-micro-service

# FROM nginx:alpine
# COPY --from=build-stage /app/dist/front-micro-service /usr/share/nginx/html

