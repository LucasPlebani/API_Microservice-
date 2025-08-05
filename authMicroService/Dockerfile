FROM node:18-alpine

WORKDIR /app

# Copier uniquement package.json et package-lock.json pour optimiser le cache
COPY package*.json ./

# Installer les outils nécessaires pour compiler bcrypt (python3, make, g++)
RUN apk add --no-cache python3 make g++

# Installer les dépendances Node.js (y compris bcrypt)
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Démarrer l'application
CMD ["node", "server.js"]
