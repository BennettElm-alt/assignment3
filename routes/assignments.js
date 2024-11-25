
const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment'); // assignment model


// Home show all assignments
router.get('/', async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.render('index', { assignments }); // load index page assignments
  } catch (err) {
    console.error('Error fetching assignments:', err);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/add', (req, res) => {
  res.render('add'); // load add assignment page
});


router.post('/add', async (req, res) => {
  try {
    const newAssignment = new Assignment(req.body);
    await newAssignment.save();
    res.redirect('/'); // move to list page after edit
  } catch (err) {
    console.error('Error adding assignment:', err);
    res.status(500).send('Internal Server Error');
  }
});

// display edit form
router.get('/edit/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).send('Assignment not found');
    }
    res.render('edit', { assignment }); 
  } catch (err) {
    console.error('Error fetching assignment for edit:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Update: Handle form submission for editing an assignment
router.post('/edit/:id', async (req, res) => {
  try {
    await Assignment.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/'); // move to the list page after update
  } catch (err) {
    console.error('Error updating assignment:', err);
    res.status(500).send('Internal Server Error');
  }
});




router.post('/delete/:id', async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.redirect('/'); 
  } catch (err) {
    console.error('Error deleting assignment:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
