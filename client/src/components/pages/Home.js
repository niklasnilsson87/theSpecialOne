import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


class Home extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  render () {
    const { user } = this.props.auth
    return (
      <Container>
        <h1 className='mb-3 text-center'>Home</h1>
        <div className="mb-4 manager-card padd">
          <h3>Welcome {user ? user.name : ''}!</h3>
          <p>Team: {user ? user.teamName : ''}</p>
          <p className="rules">Welcome to the game of the search for a new Special One Manager</p>
        </div>


        <div className="mb-4 manager-card padd">
          <h3>Manager</h3>
          <p>You can visit your own page and keep track of your points and edit your personal information
            and view messages send to you</p>
            <button className='visit-player'><NavLink className="home-player" to="/manager">Visit Manager</NavLink></button>
        </div>

        <div className="mb-4 manager-card padd">
          <h3>Players</h3>
          <p>You have taken over some players that you can get to know</p>
          <button className='visit-player'><NavLink className="home-player" to="/player">Visit players</NavLink></button>
        </div>
        <div className="divider">
        <div className="mb-4 manager-card padd">
          <h3>Training</h3>
          <p>You can train your players stats to help them perform better for you in games</p>
          <button className='visit-player'><NavLink className="home-player" to="/training">Visit Training</NavLink></button>
        </div>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Home)
