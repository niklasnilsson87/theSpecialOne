const router = require('express').Router()
// Player model
const Comment = require('../../models/Comment')

router.post('/', async (req, res) => {
  console.log(req.body)
  const { id } = req.body

  const comment = await Comment.find({ userid: id })

  res.json(comment)
})

// Exports
module.exports = router
