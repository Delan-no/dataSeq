// index.js

// import des modules
const dotenv = require('dotenv');
const path = require('path');

// Résoudre le chemin du fichier .env en fonction de l'environnement
// const envFilePath = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
const envFilePath = '.env.development';


// Charger les variables d'environnement à partir du fichier
const result = dotenv.config({
    path: path.resolve(__dirname, envFilePath)
}); 

if (result.error) {
    console.error('Erreur lors du chargement du fichier .env :', result.error);
    process.exit(1); // Quittez l'application en cas d'erreur de chargement du fichier .env
}

require('./config/server'); // Importer et démarrer le serveur Express
