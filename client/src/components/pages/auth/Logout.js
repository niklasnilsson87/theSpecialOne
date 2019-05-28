import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../../actions/authActions'
import PropTypes from 'prop-types'

class Logout extends Component {

  static propTypes = {
    logout: PropTypes.func.isRequired
  }

  render () {
    return (
      <Fragment>
        <NavLink name="logout" onClick={this.props.logout} to='/'>Logout</NavLink>
      </Fragment>
    )
  }
}

export default connect(null, { logout })(Logout)
