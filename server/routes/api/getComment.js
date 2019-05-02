const router = require('express').Router()
// Player model
const Comment = require('../../models/Comment')

router.post('/', async (req, res) => {
  const { id } = req.body

  const comment = await Comment.find({ userid: id })
    .sort({ date: -1 })

  res.json(comment)
})

// Exports
module.exports = router
