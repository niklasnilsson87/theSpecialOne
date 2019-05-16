import React, { Component } from 'react'

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter : 0 ,
      countend : 90,
    }
    this.intervalID = 0
    this.randomEvent = Math.floor((Math.random() * 50) + 1)
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
      <div className="flex text-center" style={{justifyContent: 'center'}}>
        <h1 className='text-center'>
          {this.state.counter}
        </h1>
      </div>
    )
  }
}

export default Counter
