import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { getPlayers } from '../../../actions/playerActions'
import { updatePoints } from '../../../actions/editActions'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Counter from './Counter'


class Matches extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      homeTeamValue: '',
      awayTeamValue: '',
      decider: '',
      lastGameDate: this.props.auth.user.lastPlayed,
      newGameDate: Date.now(), 
      canIPlay: false,
      users: []
    }
}

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
      awayTeamValue: ''
    })
  }

  componentDidUpdate() {
    console.log('new date: ', this.state.newGameDate)
    console.log('last GAme: ', this.state.lastGameDate)
  }

  componentDidMount(){
  
    // let dateNow = new Date()
    // dateNow.setHours(dateNow.getHours() + 4)
    // let newDate = dateNow.toISOString()

    this.setState({ newGameDate: this.state.lastGameDate + 4*3600*1000})

    if (this.state.lastGameDate === 0 || this.state.lastGameDate > this.state.newGameDate) {
      this.setState({ canIPlay: true})
    }

    this.props.getPlayers(this.props.auth.user).then(() => {
      this.countValues()
    })
     this.loadUsers()
     
  }

  loadUsers() {
    axios.get('/api/edit').then(res => {
      this.setState({ users: res.data.filter(user => user._id !== this.props.auth.user._id)})
    })
  }

  setValue = (val) => {
    const arr = []
    val.map(v => arr.push(v.totalValue))

    const value = arr.reduce((a, b) => a + b, 0)
    return value
  }

  countValues = () => {
    const { players } = this.props.player

    this.setState({ homeTeamValue: this.setValue(players)})
  }

  onClick = (e) => {
    e.preventDefault()
    const _id = e.target.value
    
    this.sendPost(_id)
  
    this.toggle()
    this.setState({ lastGame: Date.now()})
  }

  gamefinished() {
    //
  }

  sendPost = (_id) => {
    const config = {
      headers: {
      'Content-Type': 'application/json'
      }
    }

    if (this.props.auth.token) {
      config.headers['x-auth-token'] = this.props.auth.token
    }

    const body = JSON.stringify({ _id })

    axios.post('/api/players', body, config)
      .then(res => {
        this.setState({ awayTeamValue: this.setValue(res.data)})
      })
      .then(() => {
        this.winLose()
      })
  }

   winLose = () => {
    if (this.state.awayTeamValue !== '') {
    if (this.state.homeTeamValue > this.state.awayTeamValue) {
      const lastGame = Date.now()
      this.props.updatePoints(lastGame, 3, this.props.auth.user)
      this.setState({
        awayTeamValue: '', 
        decider: 'You Win!',
        canIPlay: false
      })
    } else if (this.state.homeTeamValue === this.state.awayTeamValue) {
      this.setState({ 
        awayTeamValue: '',
        decider: 'Its a Draw!',
        canIPlay: false
      })
    } else {
      this.setState({
        awayTeamValue: '', 
        decider: 'You Lose!',
      })
    }
  } else {
    return (
    <p className="no"></p>
    )
  }
}

  render () {
    const { users, canIPlay } = this.state
    // const canIPlay = canIPlay ? <button type='submit' onClick={this.onClick} value={user._id} className='btn-color'>Play Game!</button> : <button className='btn-color'>Wait</button>
    const userCard = this.state.users ? (
      users.map(user => {
        return (
          <div className='manager-card comment' key={user._id}>
            <Link to={`/user/${user._id}`}>
              <h3 className='player-name'>{user.teamName}</h3>
            </Link>
              <div className="player-contact">
                <span>{user.name}</span>
              </div>
              <div className='mb-2 button-div'>
              { canIPlay ? <button type='submit' onClick={this.onClick} value={user._id} className='btn-color'>Play Game!</button> : <button className='btn-color'>Wait</button> }
                
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
        {userCard}
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
        <Counter onUpdate={this.state} />
          <h3 className="decider text-center">{this.state.decider}</h3>
        </div>
        </ModalBody>
      </Modal>
      </Container>
    )
  }
}

Matches.propTypes = {
  updatePoints: PropTypes.func.isRequired,
  getPlayers: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  player: state.player
})

export default connect(mapStateToProps, { getPlayers, updatePoints })(Matches)
