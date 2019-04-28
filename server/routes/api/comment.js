const router = require('express').Router()
// const auth = require('../../middleware/authMiddleware')

// User Model
const Comment = require('../../models/Comment')

router.post('/', async (req, res) => {
  console.log(req.body)
  const { userid, teamName, comment, user } = req.body

  const newComment = new Comment({
    user,
    userid,
    comment,
    teamName
  })
  console.log(newComment)
  await newComment.save()
  res.json(newComment)
})

module.exports = router
