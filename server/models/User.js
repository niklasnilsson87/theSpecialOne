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
    type: String,
    default: 'Change description below'
  },
  favPlayer: {
    type: String,
    default: ''
  },
  favTeam: {
    type: String,
    default: ''
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  totalPoints: {
    type: Number,
    default: 10
  },
  lastPlayed: {
    type: Number,
    default: 0
  }
})

// Creates model
const User = mongoose.model('User', userSchema)

// Exports
module.exports = User
