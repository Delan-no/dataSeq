// middlewares/sessionMiddleware.js

const mongoose = require("mongoose");
const logger = require("../core/logging/globalLogging");
const { dataDecrypt } = require("../core/crypto/CryptDecrypt.js");
const sessionSchema = require("../models/sessionModel.js");
const app_db = mongoose.createConnection(process.env.MONGODB_URI + '/' + process.env.APP_DB);
const SessionModel = app_db.model("sessions", sessionSchema);

const sessionMiddleware = (req, res, next) => {
  if (req.headers['sessid']) {
    try {
      currentSession(dataDecrypt(req.headers['sessid']), req.session.cookie, req.session.cookie._expires)
    } catch (error) {
      logger.info(error);
    }
  }
  next();
};

async function currentSession(sessId, cookie, expires) {
  // if (typeof currentSession.initialized == 'undefined') {
  currentSession.initialized = true;
  currentSession.id = sessId;
  const sess = await SessionModel.findOne({ sessionId: sessId });
  // console.log('currentSession.sessioncurrentSession.sessioncurrentSession.session', sess, sessId)
  currentSession.session = sess;
  currentSession.cookie = currentSession.session.session.cookie || cookie;
  currentSession.expire = currentSession.session.expires || expires;
  // }

  return {
    initialized: currentSession.initialized,
    id: currentSession.id,
    session: currentSession.session,
    cookie: currentSession.cookie,
    expire: currentSession.expire
  }
}

const getCurrentSession = async () => await currentSession();

const getCurrentCookies = async () => {
  const sess = await currentSession()
  return sess?.cookie;
}
const getSessionExpiration = async () => {
  const sess = await currentSession()
  return sess?.expire;
}

module.exports = {
  sessionMiddleware,
  getCurrentSession,
  getCurrentCookies,
  getSessionExpiration
};
