const router = require('express').Router()
const User = require('../../models/User')
const Player = require('../../models/Player')

router.post('/', async (req, res) => {
  try {
    await User.findByIdAndRemove({ _id: req.body.id })
    await Player.deleteMany({ owner: req.body.id })
    await res.json({ Success: true })
  } catch (error) {
    console.log('del: ', error)
    await res.json({ err: error })
  }
})

module.exports = router
