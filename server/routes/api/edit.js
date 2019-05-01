const router = require('express').Router()
// const auth = require('../../middleware/authMiddleware')

// User Model
const User = require('../../models/User')

router.post('/', async (req, res) => {
  const { desc, favPlayer, favTeam, email } = req.body

  const userUpdate = await User.findOne({ email }).select('-password')
  userUpdate.description = desc
  userUpdate.favPlayer = favPlayer
  userUpdate.favTeam = favTeam
  await userUpdate.save()
  res.json(userUpdate)
})

router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find({}).select('-password')

    res.json(allUsers)
  } catch (err) {
    res.status(500).json({ msg: 'Could not find any users' })
  }
})

module.exports = router
