const mongoose = require('mongoose')

const playerAttributSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  age: { type: Number },
  country: { type: String },
  birthday: { type: String },
  egenskaper: {
    tecnival: {
      speed: Number,
      agility: Number
    },
    behaviour: {
      courage: Number
    }
  }
})

// Creates model
const PlayerAttribut = mongoose.model('PlayerAttribut', playerAttributSchema)

// Exports
module.exports = PlayerAttribut
