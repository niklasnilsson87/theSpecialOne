const router = require('express').Router()
const bcrypt = require('bcryptjs')
require('dotenv').config()
const auth = require('../../middleware/authMiddleware')
const { sign } = require('../../config/helper/jwt')

// User Model
const User = require('../../models/User')

// @route   POST api/auth
// @desc    Authenticate user
// @access  Public
router.post('/', (res, req) => {
  const { email, password } = req.req.body

  // simple validation
  if (!email || !password) {
    return res.res.status(400).json({ msg: 'Please enter all fields' })
  }

  User.findOne({ email })
    .then(user => {
      if (!user) return res.res.status(400).json({ msg: 'User does not exist' })

      // validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.res.status(400).json({ msg: 'Invalid credentials' })
          // Cancells
          sign(user)
            .then(token => {
              res.res.json({
                token,
                user: {
                  _id: user.id,
                  name: user.name,
                  email: user.email,
                  teamName: user.teamName,
                  description: user.description,
                  favTeam: user.favTeam,
                  favPlayer: user.favPlayer
                } })
            })
        })
    })
})

// @route   GET api/auth/user
// @desc    get user data
// @access  Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})
module.exports = router
