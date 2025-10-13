const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route pour l'inscription
router.post('/register', authController.register);

// Route pour la connexion
router.post('/login', authController.login);

// Routes pour l'authentification Google
router.get('/google', authController.googleAuth);
router.get('/google/callback', authController.googleCallback);

router.get('/verify', authMiddleware, authController.verifyToken);

module.exports = router; 