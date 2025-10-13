require('dotenv').config();
const mongoose = require('mongoose');


/**
 * Permet de se connecter à la bdd de l'applicatif
 * @returns L'objet de connection Mongo
 */
async function connectToAppDatabase() {
    try {
        MONGODB_APP_URI = process.env.MONGODB_URI + '/' + process.env.APP_DB;
        //connexion a la bdd
        const db_connection = mongoose.createConnection(MONGODB_APP_URI);
        //retourner l'objet de connexion
        return db_connection;
    } catch (error) {
        return null
    }
}

module.exports = {connectToAppDatabase}
