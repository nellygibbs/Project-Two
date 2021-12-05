// Require Dependencies
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const dateSeed = require('./models/dateSeed');
const datesRouter = require('./controllers/dates');


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
app.use(methodOverride('_method'));

// Mount Routes
app.use('/', datesRouter);

// Tell App to Listen
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`);
});