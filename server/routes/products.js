const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/Product');
const { authenticateToken } = require('../middleware/authMiddleware'); // Importeer de authenticateToken middleware

// Configureer Multer voor bestand uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Voeg een nieuw product toe met afbeelding
router.post('/', authenticateToken, upload.single('image'), (req, res) => {
  const { name, description, price } = req.body;
  const newProduct = new Product({
    name,
    description,
    price,
    user: req.user.id,
    image: req.file.path
  });

  newProduct.save()
    .then(product => res.json(product))
    .catch(err => res.status(400).json(err));
});

// Get all products
router.get('/', (req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json(err));
});

module.exports = router;