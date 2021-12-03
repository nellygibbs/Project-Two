// Require Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
const dateSchema = new Schema({
    location: { type: String, required: true },
    img: String,
    cost: Number,
    completed: { Boolean, default: false }
}, {timestamps: true});

// Export the model to be accessed in server.js
module.exports = mongoose.model('Date', dateSchema);

