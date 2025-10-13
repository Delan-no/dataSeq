const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        code: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        coefficient: {
            type: Number,
            required: true,
            min: 0,
            max: 100
        },
        created_at: { 
            type: Date, 
            default: Date.now 
        },
        updated_at: { 
            type: Date, 
            default: Date.now 
        }
    }
);

module.exports = SubjectSchema;