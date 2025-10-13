// database.js

const mongoose = require("mongoose");

// Objet pour stocker les connexions existantes
const connections = {};

/**
 * se connecter à une base de données spécifique
 * @param {*} dbname par defaut prend la valeur du APP_DB défini dans le fichier .env
 * @returns
 */
async function connectToDatabase(dbname = process.env.APP_DB) {
  let db_connection = null
  try{
    // Créer une nouvelle connexion a la base de donnée
    db_connection =  mongoose.createConnection(
      `${process.env.MONGODB_URI}/${process.env.APP_DB}`
    );

    //Création de la table developers(pour sauvegarder les développeurs et les utilisateurs de la plateforme)
    const developers = db_connection.model(
      "users",
      require("../models/userModel")
    );

  
    
    console.log(
      `⚡Connexion à la base de données "${process.env.APP_DB}" établie avec succès⚡`
    );

    return db_connection;
  } catch (error) {
    console.error(`Erreur de connexion à la base de données ${dbname}:`, error);
    throw error; // Rejeter l'erreur pour la gérer plus haut
  } finally {
    db_connection.close();
  }
}

module.exports = connectToDatabase;
