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
    // console.log(this.state.counter)
    // console.log(this.randomEvent)
    // console.log(this.randomEvent)
    // if (this.state.counter === this.randomEvent) {
    //   console.log('random event at:', this.state.counter)
    // }
    this.counter()
  }

  render() {
    return (
      <div>
        <h1 className='text-center'>
          {this.state.counter}
        </h1>
      </div>
    )
  }
}

export default Counter
