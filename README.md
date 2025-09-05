# PWA Courir
PWA Courir est une application web progressive (PWA) disponible en ligne à l’adresse suivante :
👉 https://pwa-courir.vercel.app
Elle s’interface avec une API Cockpit headless CMS accessible ici :
👉 https://ingrwf12.cepegra-frontend.xyz/cockpit_james_2/api.

## Fonctionnalités
* Application responsive utilisable sur mobile, tablette, (desktop pas adapté)

* Installation possible sur l’écran d’accueil (PWA)

* Récupération et affichage de données dynamiques via Cockpit CMS

* Hébergement & déploiement automatisé via Vercel.

## Technologies
* Framework : Vue.js

* Backend : Cockpit Headless CMS

* Déploiement : Vercel
 
* API : REST/JSON fournie par Cockpit

## Prérequis
Node.js v18+ recommandé

## Accès à l’API Cockpit (clé et endpoint)

> git clone [url de ce repo]
> cd pwa-courir
> npm install
> npm run dev

### Déploiement
La livraison continue est automatique via Vercel :

Pousser le code sur la branche principale, le build et le déploiement sont déclenchés automatiquement.

> Pour un déploiement manuel ou local, utiliser :
> npm run build
> npm run start

### Configuration
La configuration de l’API se fait via une variable d’environnement API_URL.

Adapter le manifest.json pour personnaliser l’apparence et les métadonnées PWA.

### API
La récupération des données se base sur l’API Cockpit :

Endpoint : https://ingrwf12.cepegra-frontend.xyz/cockpit_james_2/api

Documentation API : se référer à l’interface d’administration Cockpit pour connaître les collections et endpoints disponibles.