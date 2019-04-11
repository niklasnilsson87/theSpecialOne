import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar'
import Home from './components/pages/Home'
import Manager from './components/pages/Manager'
import Players from './components/pages/Players'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className='App'>
            <AppNavbar />
            <Route exact path='/' component={Home} />
            <Route path='/manager' component={Manager} />
            <Route path='/player' component={Players} />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
