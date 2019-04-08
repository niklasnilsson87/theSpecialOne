const router = require('express').Router()

// Player model
const Player = require('../../models/Player')

// @Route  GET api/players
// @desc   Get all players
// access  Public
router.get('/', (req, res) => {
  Player.find()
    .sort({ date: -1 })
    .then(players => res.json(players))
})

// @Route  POST api/players
// @desc   Create a player
// access  Public
router.post('/', (req, res) => {
  console.log(req.body)
  const newPlayer = new Player({
    name: req.body.name,
    age: req.body.age,
    city: req.body.city
  })

  newPlayer.save().then(player => res.json(player))
})

// Exports
module.exports = router
