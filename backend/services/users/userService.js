const databaseUtil = require("../../core/utils/databaseUtil");
const logger = require("../../core/logging/globalLogging");
const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
const MODELS = {
    USERS: "users",
};

const getDbConnection = async () => {
  const connection = await databaseUtil.connectToAppDatabase();
  if (!connection) {
    throw new Error("Echec de connexion à la base de données!");
  }
  return connection;
};

const createUsers = async (userData) => {
  let db_connection = null;
  try {
    db_connection = await getDbConnection();
    const Users = db_connection.model(MODELS.USERS, userModel);
    
    // Vérifier si l'email existe déjà
    const existingUser = await Users.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('Cet email est déjà utilisé');
    }

    // Vérifier si le username existe déjà
    const existingUsername = await Users.findOne({ username: userData.username });
    if (existingUsername) {
      throw new Error('Ce nom d\'utilisateur est déjà utilisé');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const user = new Users({
      ...userData,
      password: hashedPassword,
      status: 'active',
      created_at: new Date(),
      updated_at: new Date()
    });

    const savedUsers = await user.save();
    logger.info('User créé avec succès', { userId: savedUsers._id });
    return savedUsers;
  } catch (error) {
    logger.error('Erreur lors de la création du user', { error: error.message });
    throw new Error(`Erreur lors de la création du user: ${error.message}`);
  } finally {
    if (db_connection) {
      db_connection.close();
    }
  }
};

const findByEmail = async (email) => {
  let db_connection = null;
  try {
    db_connection = await getDbConnection();
    const Users = db_connection.model(MODELS.USERS, userModel);
    return await Users.findOne({ email });
  } catch (error) {
    logger.error('Erreur lors de la recherche de l\'utilisateur', { error: error.message });
    throw new Error(`Erreur lors de la recherche de l'utilisateur: ${error.message}`);
  } finally {
    if (db_connection) {
      db_connection.close();
    }
  }
};

const findById = async (id) => {
  let db_connection = null;
  try {
    db_connection = await getDbConnection();
    const Users = db_connection.model(MODELS.USERS, userModel);
    return await Users.findById(id);
  } catch (error) {
    logger.error('Erreur lors de la recherche de l\'utilisateur par ID', { error: error.message });
    throw new Error(`Erreur lors de la recherche de l'utilisateur par ID: ${error.message}`);
  } finally {
    if (db_connection) {
      db_connection.close();
    }
  }
};

const updateLastLogin = async (userId) => {
  let db_connection = null;
  try {
    db_connection = await getDbConnection();
    const Users = db_connection.model(MODELS.USERS, userModel);
    return await Users.findByIdAndUpdate(
      userId,
      { 
        lastLogin: new Date(),
        updated_at: new Date()
      },
      { new: true }
    );
  } catch (error) {
    logger.error('Erreur lors de la mise à jour de la dernière connexion', { error: error.message });
    throw new Error(`Erreur lors de la mise à jour de la dernière connexion: ${error.message}`);
  } finally {
    if (db_connection) {
      db_connection.close();
    }
  }
};

const getAllUsers = async () => {
  let db_connection = null;
  try {
    db_connection = await getDbConnection();
    const Users = db_connection.model(MODELS.USERS, userModel);
    return await Users.find();
  } catch (error) {
    logger.error('Erreur lors de la récupération des utilisateurs', { error: error.message });
    throw new Error(`Erreur lors de la récupération des utilisateurs: ${error.message}`);
  } finally {
    if (db_connection) {
      db_connection.close();  
    }
  }
};

module.exports = {
    getDbConnection,
   createUsers,
   findByEmail,
   findById,
   updateLastLogin,
   getAllUsers
};