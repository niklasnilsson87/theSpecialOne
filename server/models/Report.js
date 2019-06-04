const mongoose = require('mongoose')

/**
 * Schema for Match Report
 */
const ReportSchema = new mongoose.Schema({
  homeTeam: {
    type: String
  },
  awayTeam: {
    type: String
  },
  homeTeamGoals: {
    type: Number
  },
  awayTeamGoals: {
    type: Number
  },
  report: {
    type: Array
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

// Creates a model for Report
const Report = mongoose.model('Report', ReportSchema)

// Exports
module.exports = Report
