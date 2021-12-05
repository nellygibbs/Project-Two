// Require Dependencies
const express = require('express');
const mongoose = require('mongoose');
const Date = require('./models/date.js');
const methodOverride = require('method-override');
const dateSeed = require('./models/dateSeed');


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

// Seed Route
app.get('/dates/seed', (req, res) => {
    Date.deleteMany({}, (error, allDates) => {})
    Date.create(dateSeed, (error, data) => {
        res.redirect('/dates'); 
    });                 
});


// Index
app.get('/dates', (req, res) => {
    Date.find({}, (err, dates) => {
        res.render('index.ejs', { dates });
    });
});

// New Route
app.get('/dates/new', (req, res) => {
    res.render('new.ejs'); //npm i ejs
});

// // Delete Route
app.delete('/dates/:id', (req, res) => {
    Date.findByIdAndDelete(req.params.id, (err, deletedDate) => {
        res.redirect('/dates');
    });
});


// Update Route
app.put('/dates/:id', (req, res) => {
    req.body.completed = !!req.body.completed; //will turn req.body into a boolean
    Date.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true}, 
        (err, updatedDate) => {
            res.redirect('/dates')
    });
});

// Create
app.post('/dates', (req, res) => {
    if(req.body.completed === 'on') {
        req.body.completed = true
    } else {
        req.body.completed = false
    }
    Date.create(req.body, (error, createdDate) => {
        res.redirect('/dates');
    });
});

// Edit Route
app.get('/dates/:id/edit', (req, res) => {
    Date.findById(req.params.id, (err, foundDate) => {
        res.render('edit.ejs', { date: foundDate});
    });   
});

// Show Route
app.get('/dates/:id', (req, res) => {
    Date.findById(req.params.id, (err, date) => {
        res.render('show.ejs', { date });
    });
});


// Tell App to Listen
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`);
});