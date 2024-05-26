// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importeer de CORS middleware

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); // Gebruik de CORS middleware

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/marktplaats', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});