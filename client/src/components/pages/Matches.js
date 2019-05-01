import React, { Component } from 'react'
import { Form, Input } from 'reactstrap'
import { getPlayers } from '../../actions/playerActions'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'

class Matches extends Component {
  state = {
    homeTeamValue: '',
    awayTeamValue: '',
    users: []
  }


  componentDidMount(){
    this.props.getPlayers(this.props.auth.user).then(() => {
      this.countValues()
    })
     this.loadUsers()
  }

  componentDidUpdate() {
    this.winLose()
  }

  loadUsers() {
    axios.get('/api/edit').then(res => {
      this.setState({ users: res.data})
    })
  }

  countValues = () => {
    const { players } = this.props.player
    const arr = []
    players.map(v => arr.push(v.totalValue))

    const value = arr.reduce((a, b) => a + b, 0)

    this.setState({ homeTeamValue: value})
  }

  onClick = (e) => {
    e.preventDefault()
    const _id = e.target.value
    
    // Headers
    const config = {
      headers: {
      'Content-Type': 'application/json'
      }
    }

    // Request body
    const body = JSON.stringify({ _id })

    axios.post('/api/players', body, config)
      .then(res => {
    const arr = []
    res.data.map(v => arr.push(v.totalValue))

    const value = arr.reduce((a, b) => a + b, 0)

    this.setState({ awayTeamValue: value})
      })
  }

   winLose = () => {
    if (this.state.awayTeamValue !== '') {
    if (this.state.homeTeamValue > this.state.awayTeamValue) {
      return (
        <p className="win">You Win!</p>
      )
    } else if (this.state.homeTeamValue === this.state.awayTeamValue) {
      return (
        <p className="draw">It´s a Draw!</p>
      )
    } else {
      return (
        <p className="lose">You Lose!</p>
        )
    }
  } else {
    return (
    <p className="no">nothing</p>
    )
  }
}

  render () {
    const { users } = this.state
    const userCard = this.state.users ? (
      users.map(user => {
        return (
          <div className='manager-card comment' key={user._id}>
              <h3 className='player-name'>{user.teamName}</h3>
              <div className="player-contact">
                <span>{user.name}</span>
              </div>
              <div className='mb-2 button-div'>
                <button type='submit' onClick={this.onClick} value={user._id} className='btn-color'>Play Game!</button>
              </div>
          </div>
          )
        })
      ) : (
        <div className='center'>No Players</div>
      )
    return (
      <Container>
        <h1>Matches</h1>
        <p>{this.state.homeTeam}</p>
        <div className='manager'>{userCard}</div>
        <div className="winLose">{this.winLose()}</div>
      </Container>
    )
  }
}

Matches.propTypes = {
  getPlayers: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  player: state.player
})

export default connect(mapStateToProps, { getPlayers })(Matches)
