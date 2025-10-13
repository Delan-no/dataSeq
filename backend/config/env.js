require('dotenv').config();

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || 'votre_secret_jwt_super_securise',
    // Ajoutez d'autres variables d'environnement ici
}; 