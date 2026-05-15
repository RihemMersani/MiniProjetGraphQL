TrafficPro 🚦

Plateforme intelligente de gestion du trafic urbain en temps réel.

📌 Description

TrafficPro est une application web intelligente permettant :

la supervision des véhicules,
la gestion du trafic urbain,
la détection et le suivi des incidents,
l’envoi de notifications en temps réel,
l’analyse des zones congestionnées,
l’affichage des données sur une carte interactive.

Le projet utilise une architecture moderne basée sur :

Frontend : React.js + Vite
Backend : Node.js + Express
API : GraphQL Apollo Server
Base de données : MySQL
Temps réel : Socket.IO WebSocket
Authentification : JWT
👥 Types d’utilisateurs
🔴 Administrateur

L’administrateur peut :

Ajouter des véhicules
Simuler des positions GPS
Créer des zones de circulation
Gérer les incidents
Modifier le statut des incidents
Envoyer des notifications
Consulter les statistiques
Visualiser les données en temps réel
Consulter la carte interactive
🔵 Opérateur

L’opérateur peut :

Déclarer des incidents
Modifier le statut des incidents
Mesurer la densité du trafic
Déclarer les zones congestionnées
Ajouter des véhicules
Consulter les notifications
Consulter la carte interactive
🛠️ Technologies utilisées
Frontend
React.js
Vite
React Router DOM
Apollo Client
Socket.IO Client
Chart.js
React ChartJS 2
Leaflet
Backend
Node.js
Express.js
Apollo Server Express
GraphQL
Socket.IO
JWT
bcryptjs
dotenv
Base de données
MySQL
mysql2

⚙️ Installation du projet
1️⃣ Cloner le projet
git clone https://github.com/username/trafficpro.git
2️⃣ Installer le backend
cd backend
npm install
3️⃣ Installer le frontend
cd frontend
npm install
⚙️ Configuration de l’environnement

Créer un fichier .env dans le dossier backend :

PORT=4000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=traffic_management

JWT_SECRET=secret_key_traffic_project
🗄️ Base de données MySQL

Créer une base :

CREATE DATABASE traffic_management;
▶️ Lancer le backend
cd backend
npm run dev

Le serveur démarre sur :

http://localhost:4000/graphql
▶️ Lancer le frontend
cd frontend
npm run dev

Le frontend démarre sur :

http://localhost:5173
🔐 Authentification JWT

Le projet utilise JWT pour sécuriser les routes.

Après connexion :

le token est stocké dans localStorage
les routes sont protégées selon le rôle utilisateur
📡 Temps réel avec WebSocket

Le projet utilise Socket.IO pour :

les notifications temps réel
les incidents dynamiques
les alertes trafic
les mises à jour instantanées
📊 Fonctionnalités principales
🚗 Gestion des véhicules
Ajout de véhicules
Consultation des véhicules
Historique des déplacements
Simulation GPS
🚨 Gestion des incidents
Déclaration d’incident
Mise à jour du statut
Consultation des incidents
Notifications automatiques
📈 Analyse du trafic
Mesure de densité
Classification des zones
Détection des congestions
Visualisation dynamique
🗺️ Carte interactive
Affichage des positions
Zones de circulation
Incidents en direct
Suivi du trafic
📌 Fonctionnalités temps réel
Notifications instantanées
Mise à jour automatique des incidents
Mise à jour automatique des zones
Synchronisation WebSocket
🎨 Interface utilisateur

Le projet possède :

une interface responsive,
un thème moderne,
une palette professionnelle,
des dashboards dynamiques,
des statistiques avec Chart.js.
🔮 Améliorations futures
Application mobile Flutter
Intelligence artificielle pour prédiction du trafic
Système de recommandation d’itinéraires
Déploiement cloud
Notifications push mobiles
👨‍💻 Réalisé par
Rihem Mersani
Arbia Aouadhi

Classe : 4-GLSI-C

📄 Licence

Projet académique réalisé dans le cadre d’un mini projet universitaire.
