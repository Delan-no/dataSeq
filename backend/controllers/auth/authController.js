const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../../config/env');
const userService = require('../../services/users/userService');
const passport = require('passport');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await userService.findByEmail(email);
        console.log("User trouvé :", user);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Email ou mot de passe incorrect'
            });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Email ou mot de passe incorrect'
            });
        }

        // Mettre à jour la dernière connexion
        await userService.updateLastLogin(user._id);

        // Générer le token JWT
        const token = jwt.sign(
            { 
                id: user._id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            success: true,
            data: {
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    role: user.role,
                    status: user.status
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la connexion',
            error: error.message
        });
    }
};

const register = async (req, res) => {
    try {
        const { username, email, password, firstname, lastname, role } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await userService.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Cet email est déjà utilisé'
            });
        }

        // Créer le nouvel utilisateur
        const user = await userService.createUsers({
            username,
            email,
            password,
            firstname,
            lastname,
            role: role || 'student' // Rôle par défaut
        });

        // Générer le token JWT
        const token = jwt.sign(
            { 
                id: user._id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            success: true,
            data: {
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    role: user.role,
                    status: user.status
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de l\'inscription',
            error: error.message
        });
    }
};

// Route pour initier l'authentification Google
const googleAuth = passport.authenticate('google', { 
    scope: ['profile', 'email']
});

// Callback après l'authentification Google
const googleCallback = passport.authenticate('google', { 
    failureRedirect: '/login',
    session: false
}, async (req, res) => {
    try {
        const user = req.user;
        
        // Générer le token JWT
        const token = jwt.sign(
            { 
                id: user._id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Rediriger vers le frontend avec le token
        res.redirect(`${process.env.FRONTEND_URL}/auth/google/callback?token=${token}`);
    } catch (error) {
        res.redirect(`${process.env.FRONTEND_URL}/login?error=${error.message}`);
    }
});

const verifyToken = async (req, res) => {
    try {
        // L'utilisateur est déjà vérifié par le middleware authMiddleware
        const user = await userService.findById(req.user.id);
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Utilisateur non trouvé'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    role: user.role,
                    status: user.status
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la vérification du token',
            error: error.message
        });
    }
};

module.exports = {
    login,
    register,
    googleAuth,
    googleCallback,
    verifyToken
}; 