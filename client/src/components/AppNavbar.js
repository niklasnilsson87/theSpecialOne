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
            <Nav className="ml-auto" navbar>
              <NavItem>
                <RRNavLink className="nav-link inline" to="/">Home</RRNavLink>
                <RRNavLink className="nav-link inline" to="/manager">Manager</RRNavLink>
                <RRNavLink className="nav-link inline" to="/player">Player</RRNavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar> 
    </div>
    )}
}

export default AppNavbar
