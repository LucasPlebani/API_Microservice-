FROM node:18-alpine

# Création du répertoire de travail
WORKDIR /app

# Copie des fichiers
COPY . .

# Installation des dépendances bcrypt
RUN npm rebuild bcrypt --build-from-source
# Installation des dépendances
RUN npm install

# Définition de la variable d'environnement par défaut
ENV PORT=3000

# Démarrage de l'application
CMD ["node", "server.js"]

