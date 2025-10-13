//Session.js
const mongoose = require("mongoose");
const {
  getCurrentSession,
  getSessionExpiration,
  getCurrentCookies
} = require("../../middlewares/sessionMiddleware");
const sessionSchema = require("../../models/sessionModel");
const logger = require("../logging/globalLogging");

const conn = mongoose.createConnection(
  process.env.MONGODB_URI + "/" + process.env.APP_DB
);

const SessionModel = conn.model("sessions", sessionSchema);

class Session {
  static async getSession() {
    const session = await getCurrentSession();
    if (!session) {
      throw new Error("No session found.");
    }
    return session;
  }

  /**
   *  Récupérer une donnée spécifique de la session.
   * @param {*} key
   * @returns
   */
  static async get(key) {
    try {
      const sessionData = await Session.getSession();
      // console.log("sessionDatasessionDatasessionDatasessionData", sessionData, 'keyyyyyyyyy', key, 'ddddddd', sessionData[key]);
      if (sessionData) {
        if (sessionData[key]) {
          if (['object', 'string'].includes(typeof sessionData[key])) {
            return JSON.parse(sessionData[key]);
          }
          return sessionData[key];
        } else {
          return `key "${key}" not exist`;
        }
      }
      return `Nothing to fetch in Session. Session is possible not set`;
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
      return await Session.getSession();
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
  static async put(key, value, req) {
    const session = getCurrentSession();
    const sessId = session.id || null
    if (!sessId) {
      throw new Error("No session ID found.");
    }

    try {
      let session = await SessionModel.findOne({ sessionId: sessId });

      if (session) {
        const sessionData = session.session;
        sessionData[key] = value;
        session.session = sessionData;
        await session.save();
        return true;
      } else {

        // Si la session n'existe pas, créer une nouvelle session
        const cookies = await getCurrentCookies();
        if (!cookies) {
          throw new Error("No cookies found.");
        }

        const sessionExpiration = await getSessionExpiration();
        if (!sessionExpiration) {
          throw new Error("No cookies found.");
        }

        //ajout des cookies dans l'objet
        const sessionData = {
          cookies,
        };

        //ajout de la valeur passé en parametre
        sessionData[key] = value;

        // sauvegarde
        session = new SessionModel({
          session: sessionData,
          expires: sessionExpiration,
        });
        await session.save();
        return true;
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
    const session = getCurrentSession();
    const sessId = session.id || null
    if (!sessId) {
      throw new Error("No session ID found.");
    }

    try {
      const session = await SessionModel.findOne({ sessionId: sessId });
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
    const session = getCurrentSession();
    const sessId = session.id || null
    if (!sessId) {
      throw new Error("No session ID found.");
    }

    try {
      const session = await SessionModel.findOne({ sessionId: sessId });
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
