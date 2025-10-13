const databaseUtil = require("../../core/utils/databaseUtil");
const logger = require("../../core/logging/globalLogging");
const mongoose = require("mongoose");
const SubjectSchema = require("../../models/subjectModel");

const MODELS = {
    SUBJECTS: "subjects"
};

const getDbConnection = async () => {
    const connection = await databaseUtil.connectToAppDatabase();
    if (!connection) {
        throw new Error("Echec de connexion à la base de données!");
    }
    return connection;
};

class SubjectService {
    // Créer une nouvelle matière
    async createSubject(subjectData) {
        let db_connection = null;
        try {
            db_connection = await getDbConnection();
            const Subjects = db_connection.model(MODELS.SUBJECTS, SubjectSchema);
            
            const subject = new Subjects({
                ...subjectData,
                created_at: new Date(),
                updated_at: new Date()
            });
            
            const savedSubject = await subject.save();
            logger.info('Matière créée avec succès', { subjectId: savedSubject._id });
            return savedSubject;
        } catch (error) {
            logger.error('Erreur lors de la création de la matière', { error: error.message });
            throw new Error(`Erreur lors de la création de la matière: ${error.message}`);
        } finally {
            if (db_connection) {
                db_connection.close();
            }
        }
    }

    // Récupération toutes les matières
    async getAllSubjects() {
        let db_connection = null;
        try {
            db_connection = await getDbConnection();
            const Subjects = db_connection.model(MODELS.SUBJECTS, SubjectSchema);
            return await Subjects.find();
        } catch (error) {
            logger.error('Erreur lors de la récupération des matières', { error: error.message });
            throw new Error(`Erreur lors de la récupération des matières: ${error.message}`);
        } finally {
            if (db_connection) {
                db_connection.close();
            }
        }
    }

    // Récupérer une matière par son ID
    async getSubjectById(id) {
        let db_connection = null;
        try {
            db_connection = await getDbConnection();
            const Subjects = db_connection.model(MODELS.SUBJECTS, SubjectSchema);
            const subject = await Subjects.findById(id);
            if (!subject) {
                throw new Error("Matière non trouvée");
            }
            return subject;
        } catch (error) {
            logger.error('Erreur lors de la recherche de la matière', { error: error.message });
            throw new Error(`Erreur lors de la recherche de la matière: ${error.message}`);
        } finally {
            if (db_connection) {
                db_connection.close();
            }
        }
    }

    // Mettre à jour une matière
    async updateSubject(id, updateData) {
        let db_connection = null;
        try {
            db_connection = await getDbConnection();
            const Subjects = db_connection.model(MODELS.SUBJECTS, SubjectSchema);
            const subject = await Subjects.findByIdAndUpdate(
                id,
                { ...updateData, updated_at: new Date() },
                { new: true, runValidators: true }
            );
            if (!subject) {
                throw new Error("Matière non trouvée");
            }
            logger.info('Matière mise à jour avec succès', { subjectId: id });
            return subject;
        } catch (error) {
            logger.error('Erreur lors de la mise à jour de la matière', { error: error.message });
            throw new Error(`Erreur lors de la mise à jour de la matière: ${error.message}`);
        } finally {
            if (db_connection) {
                db_connection.close();
            }
        }
    }

    // Supprimer une matière
    async deleteSubject(id) {
        let db_connection = null;
        try {
            db_connection = await getDbConnection();
            const Subjects = db_connection.model(MODELS.SUBJECTS, SubjectSchema);
            const subject = await Subjects.findByIdAndDelete(id);
            if (!subject) {
                throw new Error("Matière non trouvée");
            }
            logger.info('Matière supprimée avec succès', { subjectId: id });
            return subject;
        } catch (error) {
            logger.error('Erreur lors de la suppression de la matière', { error: error.message });
            throw new Error(`Erreur lors de la suppression de la matière: ${error.message}`);
        } finally {
            if (db_connection) {
                db_connection.close();
            }
        }
    }
}

module.exports = new SubjectService(); 