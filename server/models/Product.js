// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  image: {type: String, required: true},
  sold: {type: Boolean, default: false}
});

module.exports = mongoose.model('Product', ProductSchema);
