const Joi = require("joi");

// Validation schema pour classe creation et update
const classeSchema = Joi.object({
    classeName: Joi.string().min(2).max(100).required().messages({
        "string.base": "Le nom de la classe doit être une chaîne de caractères",
        "string.empty": "Le nom de la classe ne peut pas être vide",
        "string.min": "Le nom de la classe doit comporter au moins 2 caractères",
        "string.max": "Le nom de la classe ne peut pas dépasser 100 caractères"
    }),
    niveau: Joi.string().valid("Maternelle", "CI", "CP", "CE1", "CE2", "CM1", "CM2", "6ème", "5ème", "4ème", "3ème", "Seconde", "Première", "Terminale").required().messages({
        "string.base": "Le niveau doit être une chaîne de caractères",
        "any.only": "Le niveau doit être l'un des suivants : Maternelle, CI, CP, CE1, CE2, CM1, CM2, 6ème, 5ème, 4ème, 3ème, Seconde, Première, Terminale"
    }),
    anneeScolaire: Joi.string().pattern(/^\d{4}-\d{4}$/).required().messages({ "string.pattern.base": "Le format de l'année doit être 2024-2025" }),
     statut: Joi.string().valid("active", "inactive").optional(),

    create_by: Joi.string().required().messages({
        "string.base": "L'ID de l'utilisateur créateur doit être une chaîne de caractères",
        "string.empty": "L'ID de l'utilisateur créateur ne peut pas être vide"
    }),

}).unknown(false).messages({
    "object.unknown": "Le champ '{#label}' n'est pas autorisé dans la requête."
});

//middelware pour valider le params (_id) de rooms
const idSchema = Joi.object({
  _id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.base": "L'ID doit être une chaîne de caractères.",
    "string.empty": "L'ID ne peut pas être vide.",
    "string.pattern.base": "L'ID doit être un identifiant  valide"
  })
}).unknown(false).messages({
  "object.unknown": "Le champ '{#label}' n'est pas autorisé dans la requête."
});

const validateIdParam = (req, res, next) => {
  const { error } = idSchema.validate(req.params);
  if (error) {
    return res.status(400).json({
      success: false,
      message: "Paramètre invalide",
      error: error.details[0].message
    });
  }
  next();
};

module.exports = { classeSchema, validateIdParam };

