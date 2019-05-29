const router = require('express').Router()
require('dotenv').config()
const { sign, saltAndHash } = require('../../config/helper/jwt')
const { generatePlayer } = require('../generatePlayers')
// User Model
const User = require('../../models/User')

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (res, req) => {
  const { name, email, password, teamName } = req.req.body

  // simple validation
  if (!name || !email || !password || !teamName) {
    return res.res.status(400).json({ msg: 'Please enter all fields' })
  }

  User.findOne({ email })
    .then(user => {
      if (user) return res.res.status(400).json({ msg: 'User already exist' })

      const newUser = new User({
        name,
        email,
        password,
        teamName
      })

      saltAndHash(newUser)
        .then(() => {
          newUser.save()
        })
      for (let i = 0; i <= 1; i++) {
        generatePlayer(newUser.id, newUser.teamName)
      }
      sign(newUser)
        .then(token => {
          res.res.json({
            token,
            user: {
              _id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              teamName: newUser.teamName,
              description: newUser.description,
              favTeam: newUser.favTeam,
              favPlayer: newUser.favPlayer,
              totalPoints: newUser.totalPoints,
              lastPlayed: newUser.lastPlayed
            } })
        })
    })
})

module.exports = router
