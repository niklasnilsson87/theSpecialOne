const router = require('express').Router()
const auth = require('../../middleware/authMiddleware')

// User Model
const Comment = require('../../models/Comment')

router.post('/', auth, async (req, res) => {
  const { sendTo, userid, teamName, comment, user } = req.body
  console.log(req.body)

  const newComment = new Comment({
    user,
    userid,
    sendTo,
    comment,
    teamName
  })
  await newComment.save()
  res.json(newComment)
})

router.post('/getComment', auth, async (req, res) => {
  const { id } = req.body
  console.log(req.body)

  const comment = await Comment.find({ sendTo: id })
    .sort({ date: -1 })

  res.json(comment)
})

module.exports = router
