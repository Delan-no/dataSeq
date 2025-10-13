// cors.js

// Liste des origines autorisées
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    // Pour le développement
    'http://localhost:*',
    'http://127.0.0.1:*'
];
  
module.exports = allowedOrigins;
