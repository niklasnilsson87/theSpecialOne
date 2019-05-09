const router = require('express').Router()
const auth = require('../../middleware/authMiddleware')

// User Model
const Comment = require('../../models/Comment')

router.post('/', auth, async (req, res) => {
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

router.post('/getComment', auth, async (req, res) => {
  const { id } = req.body
  console.log(req.body)

  const comment = await Comment.find({ userid: id })
    .sort({ date: -1 })

  res.json(comment)
})

module.exports = router
