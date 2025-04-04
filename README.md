# Projet Node.js avec Express - Groupe 6

Ce projet est une application API construite avec Node.js et Express.

## Installation

1. Clonez ce dépôt :
   ```sh
   git clone https://github.com/nom-repo/projet.git
   ```

2. Accédez au dossier du projet :
   ```sh
   cd mon-repo
   ```

3. Installez les dépendances :
   ```sh
   npm install
   ```

## Configuration

1. Créez un fichier `.env` et ajouter une clé JWT_KEY en brut ou générée :
   ```env
    JWT_KEY=keyexample
   ```

## Lancer l'application

1. Lancez l'application avec la commande node server

## Utilisez la collection Postman

1. Avec le fichier APISocialMedia.postman_collection.json, importez le sur Postman en le glissant dans l'onglet Collections ou en appuyant sur le bouton + 
2. Dans le dossier auth, faites un signin afin de créer votre utilisateur
3. Ensuite, faites votre login afin de récupérer votre token JWT
4. Utilisez ce token dans l'onglet Authorization avec comme Auth Type : Bearer Token, cela vous permettra d'utiliser les méthodes.

