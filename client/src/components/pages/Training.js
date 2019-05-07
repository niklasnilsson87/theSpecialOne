import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPlayers } from '../../actions/playerActions'
import PropTypes from 'prop-types'
import {
  Container,
  Progress
} from 'reactstrap'

class Training extends Component {
  state = {
    traningPoints: this.props.auth.user.totalPoints,
    playerID: '',
    trainPlayer: null,
    isChange: false
  }
  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.getPlayers(this.props.auth.user)
    }
  }

  onChange = e => {
    const playerToTrain = this.props.player.players.find(p => p._id === e.target.value)
    this.setState({
      playerID: e.target.value,
      trainPlayer: playerToTrain
    })
  }

  onPlus = (e) => {
    this.setState({ isChange: true })
    const arr = e.target.name.split('.')
    let trainPlayer = {...this.state.trainPlayer}
    let targetValue = Number(e.target.value)
    if (targetValue < 20) {
      let update = targetValue + 1
      trainPlayer[arr[0]][arr[1]][arr[2]] = update
      this.setState({ trainPlayer })
    }
  }

  onMinus = (e) => {
    const arr = e.target.name.split('.')
    let trainPlayer = {...this.state.trainPlayer}

    let targetValue = Number(e.target.value)
    console.log(targetValue)
    if (targetValue > 0) {
      let update = targetValue - 1
      trainPlayer[arr[0]][arr[1]][arr[2]] = update
      this.setState({ trainPlayer })
    }
  }

  render () {

    const showButton = <button className={this.state.isChange ? 'btn-color' : 'btn-color hidden'}>send skills</button>

    const { players } = this.props.player
    const selectPlayer = 
      players.map(player => {
        return (
          <React.Fragment key={player._id}>
            <option value={player._id}>{player.firstname} {player.lastname}</option>
          </React.Fragment>
        )
      })
    const playerCard = players
    .filter(p => p._id === this.state.playerID)
    .map((player => {
      return (
            <div className={this.state.isChange ? 'red lightblue card mb-5' : 'lightblue card mb-5'} key={player._id}>
              <h4 className='player-name'>{player.firstname} {player.lastname}</h4>
              <div className='player-contact'>
                <span>Age: {player.age}</span>
                <span>Birthday: {player.birthday.substring(4, 15)}</span>
                <span>Country: {player.country}</span><br />
                <span>Team: {player.team}</span>
              </div>

              <p className='stats'>Mental</p>
              <div className='flex'>
                <span>Aggression</span>
                <Progress value={player.attributes.mental.aggression} max={20} />
                <span>{player.attributes.mental.aggression}</span>
                <button name='attributes.mental.aggression' value={player.attributes.mental.aggression} onClick={this.onPlus}>+</button>
                <button name='attributes.mental.aggression' value={player.attributes.mental.aggression} onClick={this.onMinus}>-</button>
              </div>
              <div className='flex'>
                <span>Bravery</span>
                <Progress value={player.attributes.mental.bravery} max={20} />
                <span>{player.attributes.mental.bravery}</span>
                <button name='attributes.mental.bravery' value={player.attributes.mental.bravery} onClick={this.onPlus}>+</button>
                <button name='attributes.mental.bravery' value={player.attributes.mental.bravery} onClick={this.onMinus}>-</button>
              </div>
              <div className='flex'>
                <span>Composure</span>
                <Progress value={player.attributes.mental.composure} max={20} />
                <span>{player.attributes.mental.composure}</span>
                <button name='attributes.mental.composure' value={player.attributes.mental.composure} onClick={this.onPlus}>+</button>
                <button name='attributes.mental.composure' value={player.attributes.mental.composure} onClick={this.onMinus}>-</button>
              </div>
              <div className='flex'>
                <span>Concentration</span>
                <Progress value={player.attributes.mental.concentration} max={20} />
                <span>{player.attributes.mental.concentration}</span>
                <button name='attributes.mental.concentration' value={player.attributes.mental.concentration} onClick={this.onPlus}>+</button>
                <button name='attributes.mental.concentration' value={player.attributes.mental.concentration} onClick={this.onMinus}>-</button>
              </div>
              <div className='flex'>
                <span>Leadership</span>
                <Progress value={player.attributes.mental.leadership} max={20} />
                <span>{player.attributes.mental.leadership}</span>
                <button name='attributes.mental.leadership' value={player.attributes.mental.leadership} onClick={this.onPlus}>+</button>
                <button name='attributes.mental.leadership' value={player.attributes.mental.leadership} onClick={this.onMinus}>-</button>
              </div>
              <div className='flex'>
                <span>Positioning</span>
                <Progress value={player.attributes.mental.positioning} max={20} />
                <span>{player.attributes.mental.positioning}</span>
                <button name='attributes.mental.positioning' value={player.attributes.mental.positioning} onClick={this.onPlus}>+</button>
                <button name='attributes.mental.positioning' value={player.attributes.mental.positioning} onClick={this.onMinus}>-</button>
              </div>
              <div className='flex'>
                <span>Team Work</span>
                <Progress value={player.attributes.mental.teamWork} max={20} />
                <span>{player.attributes.mental.teamWork}</span>
                <button name='attributes.mental.teamWork' value={player.attributes.mental.teamWork} onClick={this.onPlus}>+</button>
                <button name='attributes.mental.teamWork' value={player.attributes.mental.teamWork} onClick={this.onMinus}>-</button>
              </div>
              <div className='flex'>
                <span>Work Rate</span>
                <Progress value={player.attributes.mental.workRate} max={20} />
                <span>{player.attributes.mental.workRate}</span>
                <button name='attributes.mental.workRate' value={player.attributes.mental.workRate} onClick={this.onPlus}>+</button>
                <button name='attributes.mental.workRate' value={player.attributes.mental.workRate} onClick={this.onMinus}>-</button>
              </div>

              <p className='stats'>Physical</p>
              <div className='flex'>
                <span>Balance</span>
                <Progress value={player.attributes.physical.balance} max={20} />
                <span>{player.attributes.physical.balance}</span>
                <button name='attributes.physical.balance' value={player.attributes.physical.balance} onClick={this.onPlus}>+</button>
                <button name='attributes.physical.balance' value={player.attributes.physical.balance} onClick={this.onMinus}>-</button>
              </div>
              <div className='flex'>
                <span>Jumping</span>
                <Progress value={player.attributes.physical.jumping} max={20} />
                <span>{player.attributes.physical.jumping}</span>
                <button name='attributes.physical.jumping' value={player.attributes.physical.jumping} onClick={this.onPlus}>+</button>
                <button name='attributes.physical.jumping' value={player.attributes.physical.jumping} onClick={this.onMinus}>-</button>
              </div>
              <div className='flex'>
                <span>Speed</span>
                <Progress value={player.attributes.physical.speed} max={20} />
                <span>{player.attributes.physical.speed}</span>
                <button name='attributes.physical.speed' value={player.attributes.physical.speed} onClick={this.onPlus}>+</button>
                <button name='attributes.physical.speed' value={player.attributes.physical.speed} onClick={this.onMinus}>-</button>
              </div>
              <div className='flex'>
                <span>Stamina</span>
                <Progress value={player.attributes.physical.stamina} max={20} />
                <span>{player.attributes.physical.stamina}</span>
                <button name='attributes.physical.stamina' value={player.attributes.physical.stamina} onClick={this.onPlus}>+</button>
                <button name='attributes.physical.stamina' value={player.attributes.physical.stamina} onClick={this.onMinus}>-</button>
              </div>
              <div className='flex'>
                <span>Strength</span>
                <Progress value={player.attributes.physical.strength} max={20} />
                <span>{player.attributes.physical.strength}</span>
                <button name='attributes.physical.strength' value={player.attributes.physical.strength} onClick={this.onPlus}>+</button>
                <button name='attributes.physical.strength' value={player.attributes.physical.strength} onClick={this.onMinus}>-</button>
              </div>
              <p className='stats'>Tecnical</p>
              <div className='flex'>
                <span>Crossing</span>
                <Progress value={player.attributes.tecnical.crossing} max={20} />
                <span>{player.attributes.tecnical.crossing}</span>
                <button name='attributes.tecnical.crossing' value={player.attributes.tecnical.crossing} onClick={this.onPlus}>+</button>
                <button name='attributes.tecnical.crossing' value={player.attributes.tecnical.crossing} onClick={this.onMinus}>-</button>
              </div>
              <div className='flex'>
                <span>Dribbling</span>
                <Progress value={player.attributes.tecnical.dribbling} max={20} />
                <span>{player.attributes.tecnical.dribbling}</span>
                <button name='attributes.tecnical.dribbling' value={player.attributes.tecnical.dribbling} onClick={this.onPlus}>+</button>
                <button name='attributes.tecnical.dribbling' value={player.attributes.tecnical.dribbling} onClick={this.onMinus}>-</button>
              </div>
              <div className='flex'>
                <span>Finishing</span>
                <Progress value={player.attributes.tecnical.finishing} max={20} />
                <span>{player.attributes.tecnical.finishing}</span>
                <button name='attributes.tecnical.finishing' value={player.attributes.tecnical.finishing} onClick={this.onPlus}>+</button>
                <button name='attributes.tecnical.finishing' value={player.attributes.tecnical.finishing} onClick={this.onMinus}>-</button>
              </div>
              <div className='flex'>
                <span>Heading</span>
                <Progress value={player.attributes.tecnical.heading} max={20} />
                <span>{player.attributes.tecnical.heading}</span>
                <button name='attributes.tecnical.heading' value={player.attributes.tecnical.heading} onClick={this.onPlus}>+</button>
                <button name='attributes.tecnical.heading' value={player.attributes.tecnical.heading} onClick={this.onMinus}>-</button>
              </div>
              <div className='flex'>
                <span>Marking</span>
                <Progress value={player.attributes.tecnical.marking} max={20} />
                <span>{player.attributes.tecnical.marking}</span>
                <button name='attributes.tecnical.marking' value={player.attributes.tecnical.marking} onClick={this.onPlus}>+</button>
                <button name='attributes.tecnical.marking' value={player.attributes.tecnical.marking} onClick={this.onMinus}>-</button>
              </div>
              <div className='flex'>
                <span>Passing</span>
                <Progress value={player.attributes.tecnical.passing} max={20} />
                <span>{player.attributes.tecnical.passing}</span>
                <button name='attributes.tecnical.passing' value={player.attributes.tecnical.passing} onClick={this.onPlus}>+</button>
                <button name='attributes.tecnical.passing' value={player.attributes.tecnical.passing} onClick={this.onMinus}>-</button>
              </div>
            </div>
      )
        })
      )
    return (
      <Container>
          <div className='text-center mb-5'>
            <h2>Training Points {this.state.traningPoints}</h2>
          </div>
          <div className='select-player text-center'>
            <span className='select-player'>Select Player:</span>
            <select className='form-control' name='traning' defaultValue='1' onChange={this.onChange}>
              <option disabled hidden value='1'>Choose player</option>
              {selectPlayer}
            </select>
          </div>
          <div className="text-center">
          {showButton}
          </div>
          <div>
            {playerCard}
          </div>
      </Container>
    )
  }
}

Training.propTypes = {
  getPlayers: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  player: state.player
})

export default connect(mapStateToProps, { getPlayers })(Training)
