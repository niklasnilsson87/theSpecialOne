import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap'
import Logout from './pages/auth/Logout'

class AppNavbar extends Component {
  state = {
    isOpen: false
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })

  }
  render () {
    const { isAuthenticated } = this.props.auth

    const privateLinks = (
      <Fragment>
        <NavItem>
          <RRNavLink className="nav-link" to="/home">Home</RRNavLink>
        </NavItem>
        <NavItem>
          <RRNavLink className="nav-link" to="/manager">Manager</RRNavLink>
        </NavItem>
        <NavItem>
          <RRNavLink className="nav-link" to="/player">Players</RRNavLink>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    )

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RRNavLink className="nav-link" to="/login">Login</RRNavLink>
        </NavItem>
        <NavItem>
          <RRNavLink className="nav-link" to="/register">Register</RRNavLink>
        </NavItem>
      </Fragment>
    )

    const office = (
      <Fragment>
        <NavItem className="office">Office</NavItem>
      </Fragment>
    )

    return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">The Special One</NavbarBrand>
          { isAuthenticated ? office : ''}
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto inline menu" navbar>
              { isAuthenticated ? privateLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar> 
    </div>
    )}
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar)
