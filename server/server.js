// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware voor het verwerken van JSON-data
app.use(bodyParser.json());

// Gebruik de CORS middleware
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://guusveen:test@avansmarketeers.gabedqm.mongodb.net/?retryWrites=true&w=majority&appName=AvansMarketeers', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/messages', require('./routes/messages'));

// Serveer statische bestanden uit de uploads map
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware om statische bestanden te serveren vanuit de gebuildde Angular-app
app.use(express.static(path.join(__dirname, '../client/dist/client/browser')));

// Alle overige routes naar index.html sturen zodat Angular routing werkt
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/client/browser/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
