// server.js

// Import des modules
require("dotenv").config();
const cors = require("cors"); // Middleware pour gérer le cors
const http = require("node:http");
const morgan = require("morgan");// Middleware d'enregistrement de requêtes HTTP pour node.js 
const helmet = require("helmet");
const express = require("express");
const compression = require("compression");
const sslOptions = require("./ssl");
const corsOrigin = require("./cors");
const routesConfig = require("./routesConfig");
const { sessionConfig } = require("./session");
const setOrigin = require("../core/cors/setOrigin");
const connectToDatabase = require("../config/database");
const logger = require("../core/logging/globalLogging");
const handleServerEvent = require("../core/server/eventHandler");
const { sessionMiddleware } = require("../middlewares/sessionMiddleware");

// Configuration
const app = express();
const server = http.createServer(app);
const PORT = process.env.APP_PORT || 4000;
const HOST = process.env.APP_HOST || "0.0.0.0";

// Middleware de sécurité
app.use(
  cors({
    origin: setOrigin(corsOrigin),
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

app.disable("x-powered-by");
app.use(compression()); //compresser les réponses du serveur
app.use(express.json()); // Parser les requêtes JSON
app.use(morgan("dev")); // Journalisation des requêtes HTTP
app.use(helmet()); // Sécurisation des en-têtes HTTP

// Se connecter à la base de données par défaut
connectToDatabase();

//configuration de la session
app.use(sessionConfig);
// app.use(sessionMiddleware);

// Montage des routeurs à partir du fichier de configuration
routesConfig.forEach((route) => {
  const { path, router } = route;
  app.use(`/api${path}`, router);
});

//middleware pour la durée de vie des requetes
app.use((req, res, next) => {
  req.setTimeout(60000); // 60 secondes
  next();
});

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  logger.error(err.stack);
  if (err instanceof Error && err.message === 'Not allowed by CORS') {
    res.status(403).json({ message: 'CORS Error: Access Denied' });
  } else {
    res.status(500).send("Something broke!");
  }
});


server.keepAliveTimeout = 60000; // 60 secondes
server.headersTimeout = 65000; // 65 secondes, doit être supérieur à keepAliveTimeout


// Démarrage du serveur Express
server.listen(PORT, HOST);
handleServerEvent(server, HOST, PORT);
