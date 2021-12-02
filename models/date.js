// Require Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
const dateSchema = new Schema({
    location: { type: String, required: true },
    img: String,
    estimated cost: { type: Number, required: true },
    completed: type: Boolean,
}, {timestamps: true});

// Export the model to be accessed in server.js
module.exports = mongoose.model('Date', dateSchema);