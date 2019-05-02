const router = require('express').Router()
// const auth = require('../../middleware/authMiddleware')

// User Model
const Comment = require('../../models/Comment')

router.post('/', async (req, res) => {
  const { userid, teamName, comment, user } = req.body

  const newComment = new Comment({
    user,
    userid,
    comment,
    teamName
  })
  await newComment.save()
  res.json(newComment)
})

module.exports = router
