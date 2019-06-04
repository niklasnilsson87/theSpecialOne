const jwt = require('jsonwebtoken')
require('dotenv').config()

/**
 * Middleware that checks and verify that its the
 * right token that is passed in the header.
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
function auth (req, res, next) {
  const token = req.headers['x-auth-token']

  // Check for token
  if (!token) return res.status(401).json({ msg: 'No token, authorazation denied' })

  try {
  // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Add user from payload
    req.user = decoded
    next()
  } catch (e) {
    res.status(400).json({ msg: 'token is not valid' })
  }
}

// Exports
module.exports = auth
