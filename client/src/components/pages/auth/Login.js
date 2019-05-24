import React, { Component } from 'react'
import { Container, Form, Label, FormGroup, Input, Alert } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../../actions/authActions'
import { clearErrors } from '../../../actions/errorActions'

class Login extends Component {
  state = {
    email: '',
    password: '',
    msg: ''
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props
    if(error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL'){
        this.setState({ msg: error.msg.msg})
      } else {
        this.setState({ msg: null })
      }
    }
    if (isAuthenticated) {
      this.props.history.push('/home')
    }
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()

   const { email, password } = this.state

   const user = {
     email,
     password
   }
   // Attempt to login
   this.props.login(user)
  }

  render () {
    return (
      <Container className='form-div'>
        <h2 className="text-center mb-2">Login</h2>
        { this.state.msg ? (<Alert color='danger'>{this.state.msg}</Alert>) : null}
        <Form expand='sm' onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for='exampleEmail'>Email</Label>
            <Input type='email' name='email' className='login-form' onChange={this.onChange} placeholder='Enter your username here...' />
          </FormGroup>
          <FormGroup>
            <Label for='examplePassword'>Password</Label>
            <Input type='password' name='password' className='mb-1' onChange={this.onChange} placeholder='Enter your password here...' />
          </FormGroup>
          <button type='submit' name='login' className='btn-color'>Login</button>
        </Form>
        <button type='submit' className='btn-color text-dec'><NavLink to="/register">Register a team</NavLink></button>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(Login)
