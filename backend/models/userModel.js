const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        firstname: {
            type: String,
            required: true,
            trim: true
        },
        lastname: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez fournir une adresse email valide']
        },
        password: {
            type: String,
            required: true
        },
        profileImage: {
            type: String,
            default: "",
            required: false
        },
        role: {
            type: String,
            enum: ["admin", "teacher", "student", "parent"],
            default: "student"
        },
        dateOfBirth: {
            type: Date,
            required: false
        },
        address: {
            street: { type: String, default: "" },
            city: { type: String, default: "" },
            postalCode: { type: String, default: "" },
            country: { type: String, default: "" }
        },
        phoneNumber: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            enum: ["active", "inactive", "suspended"],
            default: "active"
        },
        lastLogin: {
            type: Date,
            default: null
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

module.exports = UserSchema;