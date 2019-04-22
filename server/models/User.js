const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  teamName: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  register_date: {
    type: Date,
    default: Date.now
  }
})

// Creates model
const User = mongoose.model('User', userSchema)

// Exports
module.exports = User
