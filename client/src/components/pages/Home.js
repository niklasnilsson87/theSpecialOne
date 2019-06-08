import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

/**
 * Component for Home.
 *
 * @class Home
 * @extends {Component}
 */
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
          <p className="rules">
            This is the search for the new special one manager. Manage your team { user.teamName } to glory by winning matches and earn manager points to train your players to get a bettar chance of
            leading your team to more victories.
          </p>
        </div>


        <div className="mb-4 manager-card padd">
          <h3>Manager</h3>
          <p>
            You can visit your office and keep track of your points and edit your profile page.
            You can add a description for your team or yourself. And send comments to share roumors about 
            your players, staff or even make an announcement.
          </p>
            <NavLink className="text-dark font-weight-bold home-player" to="/manager">Visit Manager</NavLink>
        </div>

        <div className="mb-4 manager-card padd">
          <h3>Players</h3>
          <p>
            Your scout has been busy to find players from around the world. He traveled over a month and came back with
            some interesting players indeed.
            They are exited to meet their new manager.
          </p>
          <NavLink className="text-dark font-weight-bold home-player" to="/player">Visit players</NavLink>
        </div>

        <div className="mb-4 manager-card padd">
          <h3>Matches</h3>
          <p>
            As we call it around the office, "The Battlefield". Here you can send your team to play against other managers teams. 
            You earn 3 points for a win and 1 point for draw and 0 points if you loose the game. If other managers are trying to beat you and they loose
            you get 3 points for the win! good huh?
          </p>
          <NavLink className="text-dark font-weight-bold home-player" to="/matches">Visit Matches</NavLink>
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

// Function to get states for global store.
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Home)
