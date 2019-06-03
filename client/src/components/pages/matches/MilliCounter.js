import React, { Component } from 'react'

class MilliCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      milliCounter : 0,
      countend : 60
    }
    this.intervalID = 0
  }

  componentDidMount() {
    this.intervalID = setInterval(this.milliCount, 10)
    setTimeout(() => {
      clearInterval(this.intervalID)
      this.setState({ milliCounter: '0' })
    }, 90000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
  }

  milliCounter = () => {
    if (this.state.milliCounter <= this.state.countend) {
      if (this.state.milliCounter === this.state.countend) {
        this.setState({ milliCounter: 0 })
      }
      this.setState({ milliCounter: this.state.milliCounter + 1 })
    }
  }
  
  milliCount = () => {
    this.milliCounter()
  }

  render() {
    return (
        <span className='text-center'>
          { this.state.milliCounter < 10 
            ? <span>0{this.state.milliCounter}</span> 
            : <span>{this.state.milliCounter}</span> }
        </span>
    )
  }
}

export default MilliCounter
