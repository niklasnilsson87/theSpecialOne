import React, { Component } from 'react'
import store from './store'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar'
import Home from './components/pages/Home'
import Manager from './components/pages/Manager'
import Players from './components/pages/Players'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import PrivateRoutes from './privateRoutes/PrivateRoutes'
import { loadUser } from './actions/authActions'

class App extends Component {
  componentDidMount () {
    store.dispatch(loadUser)
  }

  render () {
    return (
      <BrowserRouter>
        <AppNavbar />
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/register' component={Register} />
          <PrivateRoutes path='/manager' component={Manager} />
          <PrivateRoutes path='/player' component={Players} />
          <PrivateRoutes path='/home' component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
