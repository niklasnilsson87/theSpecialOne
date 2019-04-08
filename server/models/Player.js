const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// Creates model
const Player = mongoose.model('Player', playerSchema)

// Exports
module.exports = Player
