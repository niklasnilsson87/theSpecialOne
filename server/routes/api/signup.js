const router = require('express').Router()
const bcrypt = require('bcryptjs')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { player } = require('../playerSchema')
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
        teamName,
        description: 'no description'
      })

      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.log(err)
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) console.log(err)
          newUser.password = hash
          newUser.save()
            .then(user => {
              for (let i = 0; i < 1; i++) {
                player(user.id, user.teamName)
              }
              jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) console.log(err)
                  res.res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      teamName: user.teamName
                    } })
                }
              )
            })
        })
      })
    })
})

module.exports = router
