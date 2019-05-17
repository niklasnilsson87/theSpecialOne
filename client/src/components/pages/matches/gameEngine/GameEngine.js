import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import Counter from '../Counter'
import uuid from 'uuid'
import { updatePoints } from '../../../../actions/editActions'
import PropTypes from 'prop-types'


class GameEngine extends Component {
  state = {
    homeGoals: 0,
    awayGoals: 0,
    events: ['Game started!'],
    counter: 0,
    awayTeamPlayers: [],
    randomEvents: [
      `' The home crowd is singing and sets of fireworks to cheer for there team.`,
      `' What is that? is that a cat running around on the pitch?`,
      `' The camera spots Josè Mourinho in the audiens today. Maybe looking to replace the home team manager?`,
      `' The away crowd is singing and creating a nice atmosphere in the stadium.`,
      `' The ball boy behind the away goalkeeper is the home managers son. Is he going to try and manipulate the away team golie?`
    ]
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  componentDidMount() {
    const { homeTeamPlayers, awayTeamPlayers, homeTeamValue, awayTeamValue } = this.props.stateFromManager
    const { awayTeamManager } = this.props.stateFromManager
    this.match = setInterval(() => {
      let hp = homeTeamPlayers[this.randomEvents(homeTeamPlayers.length - 1)]
      let ap = awayTeamPlayers[this.randomEvents(awayTeamPlayers.length - 1)]
      
      if (this.state.counter === 90 ) {
        this.setState({
          events: [...this.state.events, `${this.state.counter}' phhhyyy phhhyyy phhhyyy!! Game ended ${hp.team} ${this.state.homeGoals} - ${this.state.awayGoals} ${ap.team}.`] }, () => {
            this.winLose(awayTeamManager)
          })
        clearInterval(this.match)
      }

      this.engine(hp, ap, homeTeamValue, awayTeamValue)

    }, 200)
  }

  componentWillUnmount() {
    clearInterval(this.match)
  }

  randomEvents = (number) => {
    return Math.floor(Math.random() * number) + 1 
  }

  counter = (e) => {
    this.setState({ counter: e.counter })
  }

  engine = (hp, ap, homeTeamValue, awayTeamValue) => {

    let playerTotalValueEvent = this.randomEvents(100)
    let teamTotalValueEvent = this.randomEvents(200)
    let awayTeamAttackingEvent = this.randomEvents(100)
    let homeTeamAttackingEvent = this.randomEvents(100)
    let eventOccure = this.randomEvents(400)
    let eventCollection = this.randomEvents(this.state.randomEvents.length -1)

    if (playerTotalValueEvent === this.state.counter) {
      if (hp.totalValue > ap.totalValue) {
        this.setState({ 
          homeGoals: this.state.homeGoals += 1,
          events: [...this.state.events, `${this.state.counter}' GOOOOOOAAAALLL!!! ${hp.firstname} ${hp.lastname} scores the goal for ${hp.team}.`] })
      } else {
        this.setState({
          awayGoals: this.state.awayGoals += 1,
          events: [...this.state.events, `${this.state.counter}' Very good tackle by ${ap.firstname} ${ap.lastname} he takes the ball dribbles in front of the ${hp.team}s penalty area and shoots and SCORES!!!! `]
        })
      }
    }

    if (awayTeamAttackingEvent === this.state.counter) {
      if(ap.attributes.tecnical.dribbling > hp.attributes.mental.positioning) {
      this.setState({ events: [...this.state.events, `${this.state.counter} ${ap.firstname} ${ap.lastname} goes through the defense and fires...`] })
        if(ap.attributes.tecnical.finishing + ap.attributes.mental.concentration + ap.attributes.physical.speed > hp.attributes.mental.aggression + hp.attributes.tecnical.marking + hp.attributes.mental.concentration) {
          this.setState({
            awayGoals: this.state.awayGoals += 1,
            events: [...this.state.events, `${this.state.counter}' GOOOOAAAAALLLL!!! for ${ap.team} ${ap.lastname} scores with a wonderfull finish in the bottom right corner...`] })
        } else {
          this.setState({
            events: [...this.state.events, `${this.state.counter}' Blocked by ${hp.firstname} ${hp.lastname} and cleared up the pitch.`] })
        }
      } else {
        this.setState({ events: [...this.state.events, `${this.state.counter} ${ap.firstname} ${ap.lastname} tries to dribble around ${hp.firstname} ${hp.lastname} but ${hp.lastname} gave him a lesson in defending.`] })
      }
    }

    if (teamTotalValueEvent === this.state.counter) {
      if (homeTeamValue > awayTeamValue) {
        this.setState({
          homeGoals: this.state.homeGoals += 1,
          events: [...this.state.events, `${this.state.counter}' GOOOOAAAAALLLL!!! ${hp.lastname} scores a banger from 30 yards just under the crossbar.`] })
      } else {
        this.setState({
          awayGoals: this.state.awayGoals += 1,
          events: [...this.state.events, `${this.state.counter}' GOOOOAAAAALLLL!!! ${ap.lastname} scores a header from a corner.`] })
      }
    }

    if (eventOccure === this.state.counter) {
      this.setState({
        events: [...this.state.events, this.state.counter + this.state.randomEvents[eventCollection]] })
    }

    if (homeTeamAttackingEvent === this.state.counter) {
      if (hp.attributes.mental.teamWork > ap.attributes.mental.workRate) {
        this.setState({ events: [...this.state.events, `${this.state.counter}' ${hp.firstname} ${hp.lastname} is really showing his intelligence to set up his teammates with smart and simple passes`] })
        if (hp.attributes.tecnical.passing + hp.attributes.mental.composure + hp.attributes.physical.stamina > ap.attributes.physical.balance + ap.attributes.mental.bravery + ap.attributes.physical.strength) {
          this.setState({
            homeGoals: this.state.homeGoals += 1,
            events: [...this.state.events, `${this.state.counter}' GOOOOOOAAAALLL!!! Magic play from ${hp.team} to set up ${hp.lastname} in a good position to let him do a tap-in goal 2 feet from the goal line!`] })
        } else {
          this.setState({ events: [...this.state.events, `${this.state.counter}' Turns out that ${ap.team} was not going to be fooled this time as ${ap.firstname} ${ap.lastname} made a great interception`] })
        }
      } else {
        this.setState({ events: [...this.state.events, `${this.state.counter}' ${hp.firstname} ${hp.lastname} seemed to have left his brain at home and tries to dribble the ball for as long as possible even though there where 3 players left alone in the box.`] })
      }
    }
  }

 scrollToBottom = () => {
  if (this.state.counter < 90) {
    const container = ReactDOM.findDOMNode(this.messageContainer)
    container.scrollTop = container.scrollHeight
  }
  }

  winLose = (awayTeamManager) => {
    const lastGame = Date.now()
    console.log(lastGame)
    if (this.state.homeGoals > this.state.awayGoals) {
      this.props.updatePoints(this.props.auth.user, awayTeamManager, 3, lastGame, 'win')
    } else if (this.state.homeGoals === this.state.awayGoals) {
      this.props.updatePoints(this.props.auth.user, awayTeamManager, 1, lastGame, 'draw')
    } else {
      this.props.updatePoints(this.props.auth.user, awayTeamManager, 3, lastGame, 'lose')
    }
}

  render () {
    const { events } = this.state
    let event = events.map(e => {
      return (
      <div key={uuid()} className='mt-2 mb-2'>
        <p>{e}</p>
      </div>
      )
    })
    const { homeTeamManager, awayTeamManager } = this.props.stateFromManager
    return (
      <div>
        <div className="game-board">
          
        <div className='flex text-center'>
          <span className='col-4'>{homeTeamManager.teamName}</span>
          <span className='col-1'>{this.state.homeGoals}</span>
          <span className='col-1'><Counter onCounterUpdate={this.counter}/></span>
          <span className='col-1'>{this.state.awayGoals}</span>
          <span className='col-4'>{awayTeamManager.teamName}</span>
        </div>
        </div>
        <div className="game-event" ref={(el) => this.messageContainer = el}>
          {event}
        </div>
      </div>
    )
  }
}

GameEngine.propTypes = {
  updatePoints: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { updatePoints })(GameEngine)
