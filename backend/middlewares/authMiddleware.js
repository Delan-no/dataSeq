// authMiddleware.js
const session = require("../core/session/Session"),
  Session = new session();

const http = require("node:http");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');


function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) {
    // L'utilisateur est authentifié, passez au middleware suivant
    next();
  } else {
    // L'utilisateur n'est pas authentifié, renvoyer une réponse d'erreur
    res.status(401).send("Accès non autorisé. Veuillez vous connecter.");
  }
}

const authMiddleware = async (req, res, next) => {
    try {
        // Récupérer le token du header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Authentification requise. Token manquant.'
            });
        }

        const token = authHeader.split(' ')[1];

        // Vérifier le token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Ajouter les informations de l'utilisateur à la requête
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token invalide ou expiré'
        });
    }
};

module.exports = authMiddleware;
