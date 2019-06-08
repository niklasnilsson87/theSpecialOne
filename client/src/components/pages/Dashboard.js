import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import Login from './auth/Login'
import Register from './auth/Register'
import PropTypes from 'prop-types'

/**
 * Component for Dashboard.
 *
 * @class Dashboard
 * @extends {Component}
 */
class Dashboard extends Component {
  state = {
    isLogin: true
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool
  }

  onClick = (e) => {
    if (e.target.textContent === 'Login')
    this.setState({
      isLogin: true
    })
    if (e.target.textContent === 'account.')
    this.setState({
      isLogin: false
    })
  }

  componentDidUpdate() {
  const { isAuthenticated } = this.props
     if (isAuthenticated) {
      this.props.history.push('/home')
    }
  }

  render () {
    return (
      <Container>
        <div className='logo'>
          <img src='/img/TSO-Logo.png' alt='Logo' />
        </div>
        <div className="dash-back">
        <h3 className='text-center'>Welcome to The Special One!</h3>
        <div>
          <div>
            <p className='text-white'>
              In The Special One you get the opportunity to manage your team to glory.
              Your scout has been all around the world trying to find players to join your club.
              They are by no means perfect but with your guidance and traning you can give them the conditions to
              be the best players in the world! Play matches agains other managers and become the Special One!
            </p>
          </div>
          <div>
            <p className='text-white'>
              So what are you wating for? Jump in to the fantasy of being a manager of your dreams.
              <span className='font-weight-bold pointer ml-1 mr-1' onClick={this.onClick}>
                Login
              </span>
               in or create an 
               <span className='font-weight-bold pointer ml-1 mr-1' onClick={this.onClick}>
                 account.
                </span>
            </p>
          </div>
          </div>
        </div>
        { this.state.isLogin 
          ? <Login /> 
          : <Register /> }
      </Container>
    )
  }
}

// Function to get states for global store.
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps)(Dashboard)
