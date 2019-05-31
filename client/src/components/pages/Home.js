import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


class Home extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render () {
    const { user } = this.props.auth
    return (
      <Container>
        <h1 className='mb-3 text-center'>Home</h1>
        <div className="mb-4 manager-card padd">
          <h3 name="manager-name">Welcome {user ? user.name : ''}!</h3>
          <p>Team: {user ? user.teamName : ''}</p>
          <p className="rules">Welcome to the game of the search for a new Special One Manager</p>
        </div>


        <div className="mb-4 manager-card padd">
          <h3>Manager</h3>
          <p>You can visit your own page and keep track of your points and edit your personal information
            and view messages send to you</p>
            <NavLink className="text-dark font-weight-bold home-player" to="/manager">Visit Manager</NavLink>
        </div>

        <div className="mb-4 manager-card padd">
          <h3>Players</h3>
          <p>
            Your scout has been busy to find players from around the world.
          </p>
          <NavLink className="text-dark font-weight-bold home-player" to="/player">Visit players</NavLink>
        </div>
        <div className="divider">
        <div className="mb-4 manager-card padd">
          <h3>Training</h3>
          <p>
            You can train your players stats to help them perform better for you in games. You train your players
            with your manager points that you earn from winning matches against other teams.
            </p>
          <NavLink className="text-dark font-weight-bold home-player" to="/training">Visit Training</NavLink>
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
