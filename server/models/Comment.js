const mongoose = require('mongoose')

/**
 *  Schema for Comment
 */
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

// Creates a model for Comment
const Comment = mongoose.model('Comment', CommentSchema)

// Exports
module.exports = Comment
