# Projet fil rouge : Microservices E-commerce

Ce projet est un site e-commerce développé dans le cadre du Bachelor 3 "Coordinateur de Projet Informatique" — présenté lors de la soutenance finale.
Il reprend les principes d’un site type Amazon, avec une architecture en microservices, une gestion de rôles utilisateurs (client, magasin, super-admin), et une interface utilisateur moderne.

---

## Fonctionnalités principales

- Authentification avec rôles (`user`, `store`)
- estion du panier (microservice Python)
- Affichage des produits et gestion par magasin
- Dashboard pour les magasins (interface React)
- Profil utilisateur (modification des infos)
- Architecture microservices avec API REST
- Conteneurisation Docker de l'ensemble

---

## Architecture des microservices

- `authService` — Node.js + Express (authentification, token, profil)
- `cartService` — Python (panier, calcul total, suppression, ajout)
- `frontend` — Angular (interface utilisateur)
- `adminDashboard` — React (interface magasin)
- `MongoDB` — base de données centralisée pour les services

Chaque microservice est déployé dans un conteneur Docker indépendant, interconnecté via un réseau Docker.

---

## Technologies utilisées

Frontend : Angular, React, HTML, CSS, Tailwind
Backend : Node.js, Express.js, Python
Base de données : MongoDB
Conteneurisation : Docker

---

## Installation (développement local)

1. **Cloner le projet :**
   sur bash : git clone https://github.com/LucasPlebani/API_Microservice-.git
   cd API_Microservice-

2. **Lancer le projet en local pour le développement :**

- lancer le micro service python en local : uvicorn app.main:app --reload
- lancer le micro service auth en local : LANCER MONGODB + npm start server.js
- lancer le micro service frontend en local : ng serve
- lancer le micro service admin dashboard en local : npm run dev

3. **Lancer le projet avec Docker pour la version finale :**
   build les containers : docker compose up --build

4. **Enlever les containers :**
   /!\ Être dans le bon dossier de projet /!\

enlever tous les containers : docker compose down --volumes --remove-orphans
