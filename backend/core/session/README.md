# Documentation du Système de Session

Cette documentation explique la mise en place et l'utilisation du système de session dans l'application. Le système de session utilise `express-session` pour gérer les sessions utilisateur et stocke les sessions dans une base de données MongoDB grâce à `mongo-connect-session`.

## Table des Matières

- [Documentation du Système de Session](#documentation-du-système-de-session)
  - [Table des Matières](#table-des-matières)
  - [Serveur](#serveur)
  - [Configuration de la Session](#configuration-de-la-session)
  - [Modèle de Session](#modèle-de-session)
  - [Middleware de Session](#middleware-de-session)
  - [Classe de Gestion des Sessions](#classe-de-gestion-des-sessions)
  - [Utilisation](#utilisation)
    - [Contribuer](#contribuer)
    - [Licence](#licence)


## Serveur

Le fichier `server.js` configure le serveur Express, initialise les sessions.

```js
// server.js

const connectToDatabase = require("../config/database"); // Importer la configuration de la base de données
// Se connecter à la base de données par défaut
connectToDatabase();

// Import des modules
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const routesConfig = require("./routesConfig");
const sessionConfig = require("./session");
const { sessionMiddleware } = require("../middlewares/sessionMiddleware");

// Configuration
const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware de sécurité
app.use(cors({
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Configuration de la session
app.use(sessionConfig);
app.use(sessionMiddleware);

// Montage des routeurs à partir du fichier de configuration
routesConfig.forEach((route) => {
  const { path, router, middleware } = route;
  if (middleware && middleware.length > 0) {
    app.use(`/api${path}`, middleware, router);
  } else {
    app.use(`/api${path}`, router);
  }
});


// Démarrage du serveur Express
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
```

## Configuration de la Session

Le fichier `session.js` configure `express-session` avec MongoDB comme store en utilisant `mongo-connect-session`.

```js
// session.js

const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);

let store = new MongoStore({
  uri: process.env.MONGODB_URI + "/" + process.env.APP_DB,
  collection: "sessions" //table où sera sauvegardé les données de session,
});

// Gérer les erreurs de connexion au store
store.on("error", function (error) {
  console.log("session store error: ", error);
});

const sessionConfig = session({
  secret: process.env.APP_TOKEN,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60, // Durée de vie du cookie de session en millisecondes
  },
  store: store,
  resave: false,
  saveUninitialized: false,
});

module.exports = sessionConfig;
```

## Modèle de Session

Le modèle de session est défini dans le fichier `models/session/sessionModel.js`.

```js
// models/session/sessionModel.js
const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema(
  {
    _id: String, // Session ID
    expires: Date,
    session: {
      type: Object,
      required: true,
    },
  },
  { collection: "sessions" }
);

module.exports = sessionSchema;
```

## Middleware de Session

Le middleware de session permet de garder en mémoire l'id de la session pour des utilisations ultérieurs.

```js

// middlewares/sessionMiddleware.js
let currentSessionId = null;

const sessionMiddleware = (req, res, next) => {
  if (req.sessionID) {
    currentSessionId = req.sessionID;
  }
  next();
};

const getCurrentSessionId = () => currentSessionId;

module.exports = {
  sessionMiddleware,
  getCurrentSessionId
};

```

## Classe de Gestion des Sessions

La classe `Session` gère les opérations CRUD sur les sessions.

```js
//Session.js
const mongoose = require("mongoose");
const { getCurrentSessionId } = require("../../middlewares/sessionMiddleware");
const sessionSchema = require("../../models/Session/sessionModel");

const conn = mongoose.createConnection(
  process.env.MONGODB_URI + "/" + process.env.APP_DB
);

const SessionModel = conn.model("sessions", sessionSchema);

class Session {
  static async getSession() {
    const sessionId = getCurrentSessionId();
    if (!sessionId) {
      throw new Error("No session ID found.");
    }

    const session = await SessionModel.findOne({ sessionId: sessionId });
    if (session) {
      session.session;
    } else {
      throw new Error("Session not found.");
    }
  }

  /**
   *  Récupérer une donnée spécifique de la session.
   * @param {*} key
   * @returns
   */
  static async get(key) {
    try {
      const sessionData = await this.getSession();
      return sessionData[key] || null;
    } catch (error) {
      console.error("Error fetching session data:", error);
      return null;
    }
  }

  /**
   * Récupérer toutes les données de la session.
   * @returns
   */
  static async all() {
    try {
      return await this.getSession();
    } catch (error) {
      console.error("Error fetching all session data:", error);
      return null;
    }
  }

  /**
   * Ajouter ou mettre à jour une donnée dans la session.
   * @param {*} key
   * @param {*} value
   * @returns
   */
  static async put(key, value) {
    const sessionId = getCurrentSessionId();
    if (!sessionId) {
      throw new Error("No session ID found.");
    }

    try {
      const session = await SessionModel.findOne({ sessionId: sessionId });
      if (session) {
        const sessionData = session.session;
        sessionData[key] = value;
        session.session = sessionData;
        await session.save();
        return true;
      } else {
        throw new Error("Session not found.");
      }
    } catch (error) {
      console.error("Error updating session data:", error);
      return false;
    }
  }

  /**
   * Supprimer une donnée spécifique de la session.
   * @param {*} key
   * @returns
   */
  static async delete(key) {
    const sessionId = getCurrentSessionId();
    if (!sessionId) {
      throw new Error("No session ID found.");
    }

    try {
      const session = await SessionModel.findOne({ sessionId: sessionId });
      if (session) {
        const sessionData = session.session;
        delete sessionData[key];
        session.session = sessionData;
        await session.save();
        return true;
      } else {
        throw new Error("Session not found.");
      }
    } catch (error) {
      console.error("Error deleting session data:", error);
      return false;
    }
  }

  /**
   * Supprimer toutes les données de la session.
   * @returns
   */
  static async clear() {
    const sessionId = getCurrentSessionId();
    if (!sessionId) {
      throw new Error("No session ID found.");
    }

    try {
      const session = await SessionModel.findOne({ sessionId: sessionId });
      if (session) {
        session.session = {};
        await session.save();
        return true;
      } else {
        throw new Error("Session not found.");
      }
    } catch (error) {
      console.error("Error clearing session data:", error);
      return false;
    }
  }
}

module.exports = Session;

```

## Utilisation

Pour utiliser le système de session, vous pouvez accéder aux méthodes de la classe `Session` depuis n'importe quel endroit de votre application.

```js
// Exemple d'utilisation dans un contrôleur ou un service

const Session = require("./path/to/Session");

async function exampleFunction(req) {
  try {
    // Ajouter une donnée à la session
    await Session.put("username", "john_doe");

    // Récupérer une donnée de la session
    const username = await Session.get("username");
    console.log("Username:", username);

    // Récupérer toutes les données de la session
    const allSessionData = await Session.all();
    console.log("All session data:", allSessionData);

    // Supprimer une donnée de la session
    await Session.delete("username");

    // Vider la session
    await Session.clear();
  } catch (error) {
    console.error("Erreur de gestion de session:", error);
  }
}
```

### Contribuer

1. Fork le dépôt
2. Créez votre branche de fonctionnalité (`git checkout -b feature/NouvelleFonctionnalite`)
3. Committez vos changements (`git commit -am 'Ajoute une nouvelle fonctionnalité'`)
4. Push sur la branche (`git push origin feature/NouvelleFonctionnalite`)
5. Créez une nouvelle Pull Request

### Licence

Ce projet est la propriété de VIPPInterstis. Tous droits réservés.