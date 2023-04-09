const mongoose = require('mongoose');

const groupChatSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: "https://res.cloudinary.com/dqmdbfgcx/image/upload/v1679234799/profile-pics/no-profile-pic.png"
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  private: {
    type: Boolean,
    default: false,
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages: [{
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    seen: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    message: {
      type: String,
      required: true
    },
    media: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
});

module.exports = mongoose.model('GroupChat', groupChatSchema);