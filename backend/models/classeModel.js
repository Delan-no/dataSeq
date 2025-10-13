const mongoose = require("mongoose");

const classeSchema = new mongoose.Schema(
    {
        classeName: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        anneeScolaire: {
            type: String,
            required: true,
            match: /^\d{4}-\d{4}$/
        },
        enseignantPrincipal: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Enseignant',
            default: null
        },
        eleve: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Eleve',
                default: null
            }
        ],
        statut: {
            type: String,
            enum: ['active', 'invisible', 'archivée'],
            default: 'active'
        }
    },
    {
        timestamps: true
    });

// Création d'un virtual pour l'effectif de la classe 
classeSchema.virtual('effectif').get(function () {
    return this.eleve.length;
});

classeSchema.set('toJSON', { virtuals: true });

module.exports = classeSchema;