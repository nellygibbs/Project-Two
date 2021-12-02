// Require Dependencies
const express = require('express');
const mongoose = require('mongoose');



// Initialize App
const app = express();

// Configure App Settings
require('dotenv').config();

// Connect to and Configure MongoDB
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

// Set up MongoDB Event Listeners
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (err) => console.log('MongoDB Error: ' + err.message));

// Mount Middleware
app.use(express.urlencoded({ extended: false })); 

// Mount Routes
// Create
app.post('/dates', (req, res) => {
    if(req.body.completed === 'on') {
        req.body.completed = true
    } else {
        req.body.completed = false
    }
    res.send(req.body);
})



// Tell App to Listen
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`);
});