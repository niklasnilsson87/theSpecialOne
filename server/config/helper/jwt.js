const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs')

const sign = user => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (error, token) => {
        if (error) return reject(error)
        return resolve(token)
      }
    )
  })
}

const saltAndHash = user => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err)
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return reject(err)
        user.password = hash
        return resolve(user)
      })
    })
  })
}

module.exports = {
  sign,
  saltAndHash
}
