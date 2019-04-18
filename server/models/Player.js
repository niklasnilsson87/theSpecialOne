const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  owner: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  age: { type: Number },
  country: { type: String },
  birthday: { type: String },
  attributes: {
    tecnical: {
      dribbling: Number,
      finishing: Number,
      heading: Number,
      marking: Number,
      passing: Number,
      crossing: Number
    },
    mental: {
      aggression: Number,
      bravery: Number,
      composure: Number,
      concentration: Number,
      leadership: Number,
      positioning: Number,
      teamWork: Number,
      workRate: Number
    },
    physical: {
      speed: Number,
      balance: Number,
      jumping: Number,
      stamina: Number,
      strength: Number
    }
  }
})

// Creates model
const Player = mongoose.model('Player', playerSchema)

// Exports
module.exports = Player
