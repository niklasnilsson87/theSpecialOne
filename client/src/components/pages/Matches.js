import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { getPlayers } from '../../actions/playerActions'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import axios from 'axios'

class Matches extends Component {
  state = {
    modal: false,
    homeTeamValue: '',
    awayTeamValue: '',
    users: []
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  componentDidMount(){
    console.log(this.props.auth.user._id)
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
      this.setState({ users: res.data.filter(user => user._id !== this.props.auth.user._id)})
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
    this.toggle()
  }

  scoreCard = (decider) => {
    return (
      <Modal
      isOpen={this.state.modal}
      toggle={this.toggle}
    >
      <ModalHeader
        toggle={this.toggle}
      >
        Score
      </ModalHeader>
      <ModalBody>
      <div className="manager-card">
        <h3 className="decider text-center">{decider}</h3>
      </div>
      </ModalBody>
    </Modal>
    )
  }

   winLose = () => {
    if (this.state.awayTeamValue !== '') {
    if (this.state.homeTeamValue > this.state.awayTeamValue) {
      return (
        this.scoreCard('You Win!')
      )
    } else if (this.state.homeTeamValue === this.state.awayTeamValue) {
      return (
        this.scoreCard('It`s a Draw!')
      )
    } else {
      return (
        this.scoreCard('You Lose!')
        )
    }
  } else {
    return (
    <p className="no"></p>
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
        <div className='center'>No Users found</div>
      )
    return (
      <Container>
        <h1>Matches</h1>
        <p>{this.state.homeTeam}</p>
        {userCard}
        {this.winLose()}
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
