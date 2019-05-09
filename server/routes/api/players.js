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
  const { _id } = req.body

  const players = await Player.find({ owner: _id })

  res.json(players)
})

router.post('/update', async (req, res) => {
  const { _id } = req.body

  const updatePlayer = req.body
  console.log(updatePlayer)

  try {
    let update = await Player.replaceOne({ _id }, updatePlayer)
    console.log(update)
    await res.json(update)
  } catch (error) {
    console.log('error', error)
  }
})

// Exports
module.exports = router
