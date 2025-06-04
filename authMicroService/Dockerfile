FROM node:18-alpine

# Crée un dossier de travail dans le conteneur
WORKDIR /app

# Copie les fichiers nécessaires
COPY package*.json ./
RUN npm install

COPY . .

# Exposer le port de l'application (à adapter si différent)
EXPOSE 3000

CMD ["node", "app.js"]
