const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    _id: String, 
    expires: Date,
    session: {
      type: Object,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
      index: true
    }
  },
  { collection: "sessions" }
);

module.exports = sessionSchema;