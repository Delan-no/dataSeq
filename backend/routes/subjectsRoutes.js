const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjects/subjectController");

// Route pour créer une nouvelle matière
router.post("/", subjectController.createSubject);

// Route pour récupérer toutes les matières
router.get("/", subjectController.getAllSubjects);

// Route pour récupérer une matière par son ID
router.get("/:id", subjectController.getSubjectById);

// Route pour mettre à jour une matière
router.put("/:id", subjectController.updateSubject);

// Route pour supprimer une matière
router.delete("/:id", subjectController.deleteSubject);

module.exports = router;
