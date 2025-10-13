const express = require("express");
const router = express.Router();

const userController = require("../controllers/users/userController");

// Route pour créer un utilisateur
router.post("/", userController.createUsers);
router.get("/", userController.getAllUsers)

module.exports = router;