// setOrigins.js

const handle = (allowedOrigins) => {
    return (origin, callback) => {
        // Autoriser les requêtes sans origine (comme les requêtes mobiles ou curl)
        if (!origin) {
            return callback(null, true);
        }

        // Vérifier si l'origine est dans la liste des origines autorisées
        const isAllowed = allowedOrigins.some(allowedOrigin => {
            // Si l'origine autorisée contient un wildcard
            if (allowedOrigin.includes('*')) {
                const pattern = new RegExp('^' + allowedOrigin.replace('*', '.*') + '$');
                return pattern.test(origin);
            }
            return allowedOrigin === origin;
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    };
};
  
module.exports = handle;
