const router = require('express').Router()
const auth = require('../../middleware/authMiddleware')
const Player = require('../../models/Player')

// @Route  POST api/players
// @desc   Create a player
// access  Public
router.post('/', auth, async (req, res) => {
  const { _id } = req.body

  try {
    const players = await Player.find({ owner: _id })
    await res.json(players)
  } catch (error) {
    await res.status(400).json({ msg: 'Could not find any players' })
  }
})

router.post('/update', auth, async (req, res) => {
  const { _id } = req.body
  const updatePlayer = req.body

  try {
    let update = await Player.replaceOne({ _id }, updatePlayer)
    await res.json(update)
  } catch (error) {
    await res.status(400).json({ msg: 'Could not update player..' })
  }
})

// Exports
module.exports = router
