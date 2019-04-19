const router = require('express').Router()
// Player model
const Player = require('../../models/Player')

// @Route  GET api/players
// @desc   Get all players
// access  Public
// router.get('/', (req, res) => {
//   Player.find()
//     .then(players => res.json(players))
// })

// @Route  POST api/players
// @desc   Create a player
// access  Public

router.post('/', async (req, res) => {
  const { id } = req.body

  const players = await Player.find({ owner: id })

  res.json(players)
})

// Exports
module.exports = router
