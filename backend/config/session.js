// session.js

const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);

const store = new MongoStore({
  uri: process.env.MONGODB_URI + "/" + process.env.APP_DB,
  collection: "sessions",
  idField: "sessionId",
});

// Gérer les erreurs de connexion au store
store.on("error", function (error) {
  console.log("session store error: ", error);
});
// console.log("process.env.APP_TOKEN", process.env.APP_TOKEN);
const sessionConfig = session({
  secret: process.env.APP_TOKEN,
  cookie: {
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: process.env.NODE_ENV === "production" ? true : false,
    domain: process.env.APP_HOST,
    maxAge: 60 * 24 * 60 * 60 * 1000, // Durée de vie du cookie de session en millisecondes
  },
  store: store,
  resave: false, // ne sauvegarde pas la session si elle n'est pas modifiée
  saveUninitialized: false, // ne crée pas de session tant que quelque chose n'est pas stocké
});

store.on('expired', function (err, session) {
  axios.post('')
})


module.exports = { store, sessionConfig };
