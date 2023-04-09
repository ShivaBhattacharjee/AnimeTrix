const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true
  },
  email: { 
    type: String, 
    unique: true, 
    required: true 
  },
  password: {
    type: String, 
    required: true
  },
  verificationCode: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;