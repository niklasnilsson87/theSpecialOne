import React, { Component } from 'react'

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter : 0 ,
      countend : 90
    }
    this.intervalID = 0
  }

  componentDidMount() {
    this.intervalID = setInterval(this.count, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
  }

  counter = () => {
    if(this.state.counter < this.state.countend) {
      this.setState({counter : this.state.counter + 1})
    }
    this.props.onCounterUpdate({ counter: this.state.counter })
  }
  
  count = () => {
    this.counter()
  }

  render() {
    return (
        <span className='text-center'>
          { this.state.counter < 10 
            ? <span>0{this.state.counter}</span> 
            : <span>{this.state.counter}</span> }
        </span>
    )
  }
}

export default Counter
