// routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create a new product
router.post('/', (req, res) => {
  const newProduct = new Product(req.body);
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