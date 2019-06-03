const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  user: {
    type: String
  },
  userid: {
    type: String
  },
  sendTo: {
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
