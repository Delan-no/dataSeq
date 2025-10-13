const subjectService = require("../../services/subjects/subjectService");

class SubjectController {
    // Créer une nouvelle matière
    async createSubject(req, res) {
        try {
            const subject = await subjectService.createSubject(req.body);
            res.status(201).json(subject);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Récupérer toutes les matières
    async getAllSubjects(req, res) {
        try {
            const subjects = await subjectService.getAllSubjects();
            res.status(200).json(subjects);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Récupérer une matière par son ID
    async getSubjectById(req, res) {
        try {
            const subject = await subjectService.getSubjectById(req.params.id);
            res.status(200).json(subject);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

    // Mettre à jour une matière
    async updateSubject(req, res) {
        try {
            const subject = await subjectService.updateSubject(req.params.id, req.body);
            res.status(200).json(subject);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // Supprimer une matière
    async deleteSubject(req, res) {
        try {
            await subjectService.deleteSubject(req.params.id);
            res.status(200).json({ message: "Matière supprimée avec succès" });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new SubjectController(); 