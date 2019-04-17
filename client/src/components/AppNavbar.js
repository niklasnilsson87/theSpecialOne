import React, { Component } from 'react'
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

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })

  }
  render () {
    return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">The Special One</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto inline menu" navbar>
                <NavItem>
                <RRNavLink className="nav-link" to="/">Home</RRNavLink>
                </NavItem>
                <NavItem>
                <RRNavLink className="nav-link" to="/login">Login</RRNavLink>
                </NavItem>
                <NavItem>
                <RRNavLink className="nav-link" to="/register">Register</RRNavLink>
                </NavItem>
                <NavItem>
                <RRNavLink className="nav-link" to="/manager">Manager</RRNavLink>
                </NavItem>
                <NavItem>
                <RRNavLink className="nav-link" to="/player">Player</RRNavLink>
                </NavItem>
                <NavItem>
                <Logout />
                </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar> 
    </div>
    )}
}

export default AppNavbar
