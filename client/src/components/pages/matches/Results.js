import React, { Component } from 'react'
import { getReports } from '../../../actions/reportActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import uuid from 'uuid' 


class Results extends Component {
  state = {
    showReport: false,
    reports: [],
    report: []
  }
  componentDidMount () {
  this.props.getReports()
    .then(() => {
      this.setState({
        reports: this.props.report.reports
      })
    })
  }

  toggle = () => {
    this.setState({
      showReport: !this.state.showReport
    })
  }

  onClick = (e) => {
    const name = e.target.getAttribute('name')
    const { reports } = this.state

    if (this.state.showReport && this.state.report[0]._id === name) {
      this.toggle()
    } else {
      this.setState({ 
        report: reports.filter(x => x._id === name),
        showReport: true
      })
    }
  }

  
  render () {
    const report = this.state.reports.map(report => {
      return (
        <div key={report._id} className="container">
        <div className="results d-flex flex-row justify-content-center">
          <div name={report._id} onClick={this.onClick} className='d-flex flex-column align-items-center'>
            <div name={report._id} className="time-stamp">
              <span name={report._id} className="pr-3 date-format">{report.date.substring(0, 10)}</span>
              <span name={report._id} className="pr-1">{report.date.substring(11, 16)}</span>
            </div>
            <div name={report._id} className="report-format">
              <span name={report._id} className="pr-1">{report.homeTeam}</span>
              <span name={report._id} className="pr-1">-</span>
              <span name={report._id} className="pr-1">{report.awayTeam}</span>
              <span name={report._id} className="pr-1">{report.homeTeamGoals}</span>
              <span name={report._id} className="pr-1">-</span>
              <span name={report._id} className="pr-1">{report.awayTeamGoals}</span>
            </div>
          </div>
        </div>
      </div>
      )
    }
    
    
    )
    return (
      <div className='report-holder'>
        <span>{report}</span>
        <div className='report'>
        { this.state.showReport && this.state.report[0].report.map(event => {
            return (
                <div key={uuid()}>
                  <p>{event}</p>
                </div>
            )})
          }
          </div>
      </div>
    )
  }
}

Results.propTypes = {
  auth: PropTypes.object.isRequired,
  report: PropTypes.object.isRequired,
  getReports: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  player: state.player,
  report: state.report
})

export default connect(mapStateToProps, { getReports })(Results)
