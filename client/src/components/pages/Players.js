import React, { Component } from 'react'
import axios from 'axios'
import uuid from 'uuid'
import { Container, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { getPlayers } from '../../actions/playerActions'
import PropTypes from 'prop-types'

class Player extends Component {
  componentDidMount () {
    this.props.getPlayers()
  }
  render () {
    const { players } = this.props.player
    return (
      <Container>
        {players.map(({ id, name }) => (
          <h4 className='card' key={id}>{name}</h4>
        ))}
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
