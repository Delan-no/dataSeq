const express = require("express");
const router = express.Router();
const classeController = require("../controllers/rooms/classeController");
const { validateIdParam } = require("../validations/classeValidation");

//route pour créer une classe
router.post("/", classeController.createClasse);
router.get("/", classeController.getAllClasses);
router.get("/active", classeController.getAllRoomActive);
router.delete("/:_id", validateIdParam, classeController.deleteClasseById);
router.put("/updateroom/:_id", validateIdParam, classeController.updateClasseById);
module.exports = router;