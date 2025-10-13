const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userService = require('../services/users/userService');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
},
async function(accessToken, refreshToken, profile, done) {
    try {
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await userService.findByEmail(profile.emails[0].value);
        
        if (existingUser) {
            // Mettre à jour la dernière connexion
            await userService.updateLastLogin(existingUser._id);
            return done(null, existingUser);
        }

        // Si l'utilisateur n'existe pas, retourner une erreur
        return done(null, false, { message: 'Email non enregistré dans le système' });
    } catch (error) {
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userService.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport; 