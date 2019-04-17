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
import { loadUser } from './actions/authActions'

class App extends Component {
  componentDidMount () {
    store.dispatch(loadUser)
  }

  render () {
    return (
      <BrowserRouter>
        <div className='App'>
          <AppNavbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/manager' component={Manager} />
            <Route path='/player' component={Players} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
