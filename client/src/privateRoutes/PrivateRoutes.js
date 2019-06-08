import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

// Stops anyone who is not authenticated and redericts them.
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/',
        pure: false
      }} />
  )} />
)

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(PrivateRoute)
