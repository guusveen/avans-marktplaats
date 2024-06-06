// models/Product.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  userEmail: { type: String, required: true }
});

ProductSchema.pre('save', function (next) {
  const product = this;
  mongoose.model('User').findOne({ email: product.userEmail }, function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Gebruiker met het opgegeven e-mailadres bestaat niet'));
    }
    next();
  });
});

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);

module.exports = { User, Product };

module.exports = mongoose.model('Product', ProductSchema);
