const databaseUtil = require("../../core/utils/databaseUtil");
const classeModel = require("../../models/classeModel");
const logger = require("../../core/logging/globalLogging");
const { classeSchema } = require("../../validations/classeValidation");
const getConnection = require("../users/userService");
const MODELS = {
    USERS: "users",
    CLASSES: "classes"
}




const createClass = async (classeData) => {
    let db_connection = null;
    try {
        // Valider les données d'entrée
        // const { error } = classeSchema.validate(classeData);

        // if (error) {
        //     throw new Error(`Validation échouée: ${error.details[0].message}`);
        // }

        db_connection = await getConnection.getDbConnection();
        const Classes = db_connection.model(MODELS.CLASSES, classeModel);
        //verifions si la classe existe déjà
        const existingClass = await Classes.findOne({ classeName: classeData.classeName });
        if (existingClass) {
            throw new Error('Cette classe existe déjà')
        }
        const classe = new Classes({
            ...classeData,
        })
        const savedClasse = await classe.save();
        logger.info('Classe créé avec succès', { classe: savedClasse })
        return savedClasse;
    } catch (error) {
        logger.error('Erreur lors de la création du classe', { error: error.message });
        throw new Error(`Erreur lors de la création du classe: ${error.message}`);
    } finally {
        if (db_connection) {
            db_connection.close();
        }
    }
};

//rechercher une classe par son nom qui est unique 
const findRoomByName = async (classeName) => {
    let db_connection = null;
    try {
        db_connection = await getConnection.getDbConnection();
        const Classe = db_connection.model(MODELS.CLASSES, classeModel);

        return await Classe;
        // .findOne({ classeName })
        //             .populate('enseignantPrincipal', 'name')
        //             .populate('eleve', 'name age');
    } catch (error) {
        logger.error('Erreur lors de la recherche de la classe', { error: error.message });
        throw new Error(`Erreur lors de la recherche de la classe: ${error.message}`);
    } finally {
        if (db_connection) {
            db_connection.close();
        }
    }
};

//Rechercher une classe par son Id 
const findClasseById = async (id) => {
    let db_connection = null;
    try {
        db_connection = await getConnection.getDbConnection();
        const Classe = db_connection.model(MODELS.CLASSES, classeModel);
        return await Classe.findById(id);
        // .populate('enseignantPrincipal', 'name').populate('eleve', 'name age');

    } catch (error) {
        logger.error('Erreur lors de la recherche de la classe par ID', { error: message });
        throw new Error(`Erreur lors de la recherche de la classe par ID:${error.message}`);
    } finally {
        if (db_connection) {
            db_connection.close()
        }
    }
};

//Modification d'une classe par son Id
const updateClasseById = async (classeId, updateData) => {
    dbConnection = null;
    try {
        const { error } = classeSchema.validate(updateData);
        if (error) {
            throw new Error(`Validation échouée: ${error.details[0].message}`);
        }

        dbConnection = await getConnection.getDbConnection();
        const Classe = dbConnection.model(MODELS.CLASSES, classeModel);
        const updatedClasse = await Classe.findByIdAndUpdate(
            classeId,
            {
                ...updateData,
            },
            { new: true, runValidators: true }
        );
        if (!updatedClasse) {
            throw new Error("Classe non trouvée");
        }
        logger.info("Classe mise à jour avec succès", { classeId });
        return updatedClasse;
    } catch (error) {
        logger.error('Erreur lors de la mise à jour de la classe', { error: error.message });
        throw new Error(`Erreur lors de la mise à jour de la classe: ${error.message}`);

    } finally {
        if (dbConnection) {
            dbConnection.close();
        }
    }
};

// fonction pour récupérer tout les classes
const getAllRooms = async () => {
    dbConnection = null;
    try {
        dbConnection = await getConnection.getDbConnection();
        const AllRooms = dbConnection.model(MODELS.CLASSES, classeModel);
        return await AllRooms.find();
        // .populate('enseignantPrincipal', 'name').populate('eleve', 'name age');

    } catch (error) {
        logger.error("Erreur lors de la récupération des classes ", { error: error.message });
        throw new Error(`Erreur lors de la récupération des classes: ${error.message}`);
    } finally {
        if (dbConnection) {
            dbConnection.close();
        }
    }
};

// fonction pour récupérer tout les classe active
const getAllRoomsActive = async () => {
    dbConnection = null;
    try {
        dbConnection = await getConnection.getDbConnection();
        const AllRooms = dbConnection.model(MODELS.CLASSES, classeModel);
        return await AllRooms.find({ statut: "active" });
        // .populate('enseignantPrincipal', 'name').populate('eleve', 'name age');

    } catch (error) {
        logger.error("Erreur lors de la récupération des classes active", { error: error.message });
        throw new Error(`Erreur lors de la récupération des classes active: ${error.message}`);
    } finally {
        if (dbConnection) {
            dbConnection.close();
        }
    }
};

const deleteClasseById = async (classeId) => {
    dbConnection = null;
    try {
        dbConnection = await getConnection.getDbConnection();
        const classe = dbConnection.model(MODELS.CLASSES, classeModel);
        const deletedClasse = await classe.findByIdAndDelete(classeId);
        if (!deletedClasse) {
            throw new Error("Classe non trouvée");
        }
    } catch (error) {
        logger.error("Erreur lors de la suppression de la classe", { error: error.message });
        throw new Error(`Erreur lors de la suppression de la classe: ${error.message}`);
    } finally {
        if (dbConnection) {
            dbConnection.close();
        }
    }
}

module.exports = {
    createClass,
    findRoomByName,
    findClasseById,
    updateClasseById,
    getAllRoomsActive,
    getAllRooms,
    deleteClasseById
};