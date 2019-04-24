import React, { Component } from 'react'
import { Container, Progress } from 'reactstrap'
import { connect } from 'react-redux'
import { getPlayers } from '../../actions/playerActions'
import PropTypes from 'prop-types'

class Player extends Component {
  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.getPlayers(this.props.auth.user)
    }
  }
  render () {
    const { players } = this.props.player
    const playerCard = this.props.player ? (
      players.map(player => {
        return (
          <div className='card mb-5' style={{ backgroundColor: 'lightBlue' }} key={player._id}>
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
            </div>
            <div className='flex'>
              <span>Bravery</span>
              <Progress value={player.attributes.mental.bravery} max={20} />
              <span>{player.attributes.mental.bravery}</span>
            </div>
            <div className='flex'>
              <span>Composure</span>
              <Progress value={player.attributes.mental.composure} max={20} />
              <span>{player.attributes.mental.composure}</span>
            </div>
            <div className='flex'>
              <span>Concentration</span>
              <Progress value={player.attributes.mental.concentration} max={20} />
              <span>{player.attributes.mental.concentration}</span>
            </div>
            <div className='flex'>
              <span>Leadership</span>
              <Progress value={player.attributes.mental.leadership} max={20} />
              <span>{player.attributes.mental.leadership}</span>
            </div>
            <div className='flex'>
              <span>Positioning</span>
              <Progress value={player.attributes.mental.positioning} max={20} />
              <span>{player.attributes.mental.positioning}</span>
            </div>
            <div className='flex'>
              <span>Team Work</span>
              <Progress value={player.attributes.mental.teamWork} max={20} />
              <span>{player.attributes.mental.teamWork}</span>
            </div>
            <div className='flex'>
              <span>Work Rate</span>
              <Progress value={player.attributes.mental.workRate} max={20} />
              <span>{player.attributes.mental.workRate}</span>
            </div>

            <p className='stats'>Physical</p>
            <div className='flex'>
              <span>Balance</span>
              <Progress value={player.attributes.physical.balance} max={20} />
              <span>{player.attributes.physical.balance}</span>
            </div>
            <div className='flex'>
              <span>Jumping</span>
              <Progress value={player.attributes.physical.jumping} max={20} />
              <span>{player.attributes.physical.jumping}</span>
            </div>
            <div className='flex'>
              <span>Speed</span>
              <Progress value={player.attributes.physical.speed} max={20} />
              <span>{player.attributes.physical.speed}</span>
            </div>
            <div className='flex'>
              <span>Stamina</span>
              <Progress value={player.attributes.physical.stamina} max={20} />
              <span>{player.attributes.physical.stamina}</span>
            </div>
            <div className='flex'>
              <span>Strength</span>
              <Progress value={player.attributes.physical.strength} max={20} />
              <span>{player.attributes.physical.strength}</span>
            </div>
            <p className='stats'>Tecnical</p>
            <div className='flex'>
              <span>Crossing</span>
              <Progress value={player.attributes.tecnical.crossing} max={20} />
              <span>{player.attributes.tecnical.crossing}</span>
            </div>
            <div className='flex'>
              <span>Dribbling</span>
              <Progress value={player.attributes.tecnical.dribbling} max={20} />
              <span>{player.attributes.tecnical.dribbling}</span>
            </div>
            <div className='flex'>
              <span>Finishing</span>
              <Progress value={player.attributes.tecnical.finishing} max={20} />
              <span>{player.attributes.tecnical.finishing}</span>
            </div>
            <div className='flex'>
              <span>Heading</span>
              <Progress value={player.attributes.tecnical.heading} max={20} />
              <span>{player.attributes.tecnical.heading}</span>
            </div>
            <div className='flex'>
              <span>Marking</span>
              <Progress value={player.attributes.tecnical.marking} max={20} />
              <span>{player.attributes.tecnical.marking}</span>
            </div>
            <div className='flex'>
              <span>Passing</span>
              <Progress value={player.attributes.tecnical.passing} max={20} />
              <span>{player.attributes.tecnical.passing}</span>
            </div>
          </div>
        )
      })
    ) : (
      <div className='center'>No Players</div>
    )
    return (
      <Container>
        <h1 className='mb-5'>Players</h1>
        {playerCard}
      </Container>
    )
  }
}

Player.propTypes = {
  getPlayers: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  player: state.player
})

export default connect(mapStateToProps, { getPlayers })(Player)
