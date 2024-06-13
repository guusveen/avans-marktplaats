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
  Product.find().populate('user', 'username') // Voeg populate toe om de gebruikersnaam op te halen
    .then(products => res.json(products))
    .catch(err => res.status(400).json(err));
});

// Get product by ID
router.get('/:id', (req, res) => {
  Product.findById(req.params.id).populate('user', 'username') // Voeg populate toe om de gebruikersnaam op te halen
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    })
    .catch(err => res.status(400).json(err));
});

// Update product status to sold
router.put('/:id/sold', authenticateToken, (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      if (product.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      product.sold = true;
      product.save()
        .then(updatedProduct => res.json(updatedProduct))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;