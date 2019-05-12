const mongoose = require('mongoose')

// Create Schema
const CommentSchema = new mongoose.Schema({
  user: {
    type: String
  },
  userid: {
    type: String
  },
  teamName: {
    type: String
  },
  comment: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
