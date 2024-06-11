const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { authenticateToken } = require('../middleware/authMiddleware');

// Create a new message
router.post('/', authenticateToken, (req, res) => {
  const { receiver, content, product } = req.body;
  const sender = req.user.id;
  const newMessage = new Message({ sender, receiver, content, product });

  newMessage.save()
    .then(message => res.json(message))
    .catch(err => res.status(400).json(err));
});

// Get all messages for a user
router.get('/', authenticateToken, (req, res) => {
  const userId = req.user.id;

  Message.find({ $or: [{ sender: userId }, { receiver: userId }] })
    .populate('sender', 'username')
    .populate('receiver', 'username')
    .populate('product', 'name')
    .then(messages => res.json(messages))
    .catch(err => res.status(400).json(err));
});

module.exports = router;
