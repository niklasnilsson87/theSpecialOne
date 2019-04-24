const router = require('express').Router()
// const auth = require('../../middleware/authMiddleware')

// User Model
const User = require('../../models/User')

router.post('/', async (req, res) => {
  console.log(req.body)
  const { desc, favPlayer, favTeam, email } = req.body

  const userUpdate = await User.findOne({ email }).select('-password')
  userUpdate.description = desc
  userUpdate.favPlayer = favPlayer
  userUpdate.favTeam = favTeam
  await userUpdate.save()
  res.json(userUpdate)
})

module.exports = router
