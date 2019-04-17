import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import { getPlayers } from '../../actions/playerActions'
import PropTypes from 'prop-types'

class Player extends Component {
  componentDidMount () {
    this.props.getPlayers()
  }
  render () {
    const { players } = this.props.player
    const playerCard = this.props.player ? (
      players.map(player => {
        return (
          <div className='card mb-5' style={{ backgroundColor: 'lightBlue' }} key={player._id}>
            <h4 className='.bg-info'>{player.firstname} {player.lastname}</h4>
            <p>Age: {player.age}</p>
            <span>Birthday: {player.birthday.substring(0, 10)}</span>
            <p>Country: {player.country}</p>
          </div>
        )
      })
    ) : (
      <div className='center'>No Posts</div>
    )
    return (
      <Container>
        <h1 className='mb-5'>Players</h1>
        {playerCard}
      </Container>
    )
  }
}

Player.propTypes = {
  getPlayers: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  player: state.player
})

export default connect(mapStateToProps, { getPlayers })(Player)
