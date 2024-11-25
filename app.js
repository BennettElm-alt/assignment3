
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); 


const app = express();


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(express.static('public')); 
app.set('view engine', 'ejs'); 

// connect to mongo
mongoose.connect(process.env.DB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));


app.post('/', async (req, res) => {
  try {
    
    const Task = require('./models/Task'); 
    const task = new Task(req.body);
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// routes
app.use('/', require('./routes/assignments')); 

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
