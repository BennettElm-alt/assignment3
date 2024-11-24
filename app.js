require('dotenv').config();

const express = require('express');
app.use(express.json());

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.post('/', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.send(task);
});

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// route
app.use('/', require('./routes/assignments'));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));



mongoose.connect(process.env.DB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Atlas connected'))
.catch(err => console.error('MongoDB connection error:', err));
