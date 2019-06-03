const mongoose = require('mongoose')

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

const Report = mongoose.model('Report', ReportSchema)

module.exports = Report
