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
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const {name, description, price, endTime, image} = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      user: req.user.id,
      image,
      endTime
    });
    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/:id/offers', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    const { price } = req.body;
    const newOffer = {
      price,
      user: req.user.id
    };
    product.offers.push(newOffer);
    await product.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all products
router.get('/', (req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
