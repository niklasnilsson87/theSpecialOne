import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


class Home extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  render () {

    const { user } = this.props.auth

    console.log(this.props.auth)
    return (
      <Container>
        <h3>Welcome to the game {user ? user.name : ''}!</h3>
        <p>May I wish the best of luck to your team {user ? user.teamName : ''}</p>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(Home)
