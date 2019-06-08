import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap'
import Logout from '../pages/auth/Logout'


/**
 * Component Navigation bar. 
 *
 * @class AppNavbar
 * @extends {Component}
 */
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
        <NavItem className='nav-item text-light font-weight-bold nav-point'>Points { this.props.auth.user && (this.props.auth.user.totalPoints)}</NavItem>
        <NavItem className="d-none d-sm-inline-block" style={{color: "white"}}>|</NavItem>
        <NavItem>
          <RRNavLink name="home" className="nav-link" to="/home">Home</RRNavLink>
        </NavItem>
        <NavItem>
          <RRNavLink name="manager" className="nav-link" to="/manager">Manager</RRNavLink>
        </NavItem>
        <NavItem>
          <RRNavLink name="player" className="nav-link" to="/player">Players</RRNavLink>
        </NavItem>
        <NavItem>
          <RRNavLink name="matches" className="nav-link" to="/matches">Matches</RRNavLink>
        </NavItem>
        <NavItem>
          <RRNavLink name="training" className="nav-link" to="/training">Training</RRNavLink>
        </NavItem>
        <NavItem style={{color: "white"}}>|</NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    )

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RRNavLink className="nav-link" to="/">Login</RRNavLink>
        </NavItem>
        <NavItem>
          <RRNavLink className="nav-link" to="/register">Register</RRNavLink>
        </NavItem>
      </Fragment>
    )

    return (
    <div>
      <Navbar dark expand="sm" style={{backgroundColor: '#8a25e2'}} sticky="top" className="mb-5">
        <NavItem style={{listStyleType: 'none'}}>
        <Link to="/home">
          <img src='/img/TSO-Logo2.png' style={{width: '70px'}} alt='Logo' />
        </Link>
        </NavItem>
        <Link className='brand-logo' to="/home">The Special One</Link>
          <NavbarToggler onClick={this.toggle} />
          
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto inline menu nav" navbar>
              { isAuthenticated ? privateLinks : guestLinks}
            </Nav>
          </Collapse>
      </Navbar> 
    </div>
    )}
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar)
