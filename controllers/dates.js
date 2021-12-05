// Require dependencies
const express = require('express');
const Date = require('../models/date');
const dateSeed = require('../models/dateSeed');

// Create Router Object
const datesRouter = express.Router(); 

// List Router Actions
// Seed Route

datesRouter.get('/seed', (req, res) => {
    Date.deleteMany({}, (error, allDates) => {})
    Date.create(dateSeed, (error, data) => {
        res.redirect('/dates'); 
    });                 
});

// Index Route
datesRouter.get('/', (req, res) => {
    Date.find({}, (err, dates) => {
        res.render('index.ejs', { dates });
    });
});

// New Route
datesRouter.get('/new', (req, res) => {
    res.render('new.ejs'); //npm i ejs
});

// Delete Route
datesRouter.delete('/:id', (req, res) => {
    Date.findByIdAndDelete(req.params.id, (err, deletedDate) => {
        res.redirect('/dates');
    });
});

// Update Route
datesRouter.put('/:id', (req, res) => {
    req.body.completed = !!req.body.completed; //will turn req.body into a boolean
    Date.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        { new: true}, 
        (err, updatedDate) => {
            res.redirect('/dates')
    });
});

// Create Route
datesRouter.post('/', (req, res) => {
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
datesRouter.get('/:id/edit', (req, res) => {
    Date.findById(req.params.id, (err, foundDate) => {
        res.render('edit.ejs', { date: foundDate});
    });   
});

// Show Route
datesRouter.get('/:id', (req, res) => {
    Date.findById(req.params.id, (err, date) => {
        res.render('show.ejs', { date });
    });
});

// Export router object to require it in server.js
module.exports = datesRouter;