const mongoose = require('mongoose');

const singleChatSchema = new mongoose.Schema({
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    seen: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    message: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  }]
});

module.exports = mongoose.model('SingleChat', singleChatSchema);