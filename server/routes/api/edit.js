const router = require('express').Router()
// const auth = require('../../middleware/authMiddleware')

// User Model
const User = require('../../models/User')

router.post('/', async (req, res) => {
  const { name, email } = req.body

  const userUpdate = await User.findOne({ email })
  userUpdate.description = name
  userUpdate.save()
  res.json(userUpdate)
})

module.exports = router
