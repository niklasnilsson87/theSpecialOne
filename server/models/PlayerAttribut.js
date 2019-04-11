const mongoose = require('mongoose')

const playerAttributSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  age: { type: Number },
  country: { type: String },
  birthday: { type: String }
})

// Creates model
const PlayerAttribut = mongoose.model('PlayerAttribut', playerAttributSchema)

// Exports
module.exports = PlayerAttribut
