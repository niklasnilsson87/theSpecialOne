import React, { Component } from 'react'
import { Container, Progress } from 'reactstrap'
import { connect } from 'react-redux'
import { getPlayers } from '../../actions/playerActions'
import PropTypes from 'prop-types'

class Player extends Component {
  componentDidMount () {
    window.scrollTo(0, 0)
    if (this.props.auth.isAuthenticated) {
      this.props.getPlayers(this.props.auth.user)
    }
  }
  render () {
    const { players } = this.props.player
    const playerCard = this.props.player ? (
      players.map(player => {
        return (
          <div className='card mb-5' style={{ backgroundColor: '#b5d99c' }} key={player._id}>
            <h4 className='player-name'>{player.firstname} {player.lastname}</h4>
            <div className='player-contact'>
              <span>Age: {player.age}</span>
              <span>Birthday: {player.birthday.substring(4, 15)}</span>
              <span>Country: {player.country}</span><br />
              <span>Team: {player.team}</span>
            </div>

            <p className='stats'>Mental</p>
            <div className='flex'>
              <span className='col-4'>Aggression</span>
              <Progress className='col-6' value={player.attributes.mental.aggression} max={20} />
              <span className='col-1'>{player.attributes.mental.aggression}</span>
            </div>
            <div className='flex'>
              <span className='col-4'>Bravery</span>
              <Progress className='col-6' value={player.attributes.mental.bravery} max={20} />
              <span className='col-1'>{player.attributes.mental.bravery}</span>
            </div>
            <div className='flex'>
              <span className='col-4'>Composure</span>
              <Progress className='col-6' value={player.attributes.mental.composure} max={20} />
              <span className='col-1'>{player.attributes.mental.composure}</span>
            </div>
            <div className='flex'>
              <span className='col-4'>Concentration</span>
              <Progress className='col-6' value={player.attributes.mental.concentration} max={20} />
              <span className='col-1'>{player.attributes.mental.concentration}</span>
            </div>
            <div className='flex'>
              <span className='col-4'>Leadership</span>
              <Progress className='col-6' value={player.attributes.mental.leadership} max={20} />
              <span className='col-1'>{player.attributes.mental.leadership}</span>
            </div>
            <div className='flex'>
              <span className='col-4'>Positioning</span>
              <Progress className='col-6' value={player.attributes.mental.positioning} max={20} />
              <span className='col-1'>{player.attributes.mental.positioning}</span>
            </div>
            <div className='flex'>
              <span className='col-4'>Team Work</span>
              <Progress className='col-6' value={player.attributes.mental.teamWork} max={20} />
              <span className='col-1'>{player.attributes.mental.teamWork}</span>
            </div>
            <div className='flex'>
              <span className='col-4'>Work Rate</span>
              <Progress className='col-6' value={player.attributes.mental.workRate} max={20} />
              <span className='col-1'>{player.attributes.mental.workRate}</span>
            </div>

            <p className='stats'>Physical</p>
            <div className='flex'>
              <span className='col-4'>Balance</span>
              <Progress className='col-6' value={player.attributes.physical.balance} max={20} />
              <span className='col-1'>{player.attributes.physical.balance}</span>
            </div>
            <div className='flex'>
              <span className='col-4'>Jumping</span>
              <Progress className='col-6' value={player.attributes.physical.jumping} max={20} />
              <span className='col-1'>{player.attributes.physical.jumping}</span>
            </div>
            <div className='flex'>
              <span className='col-4'>Speed</span>
              <Progress className='col-6' value={player.attributes.physical.speed} max={20} />
              <span className='col-1'>{player.attributes.physical.speed}</span>
            </div>
            <div className='flex'>
              <span className='col-4'>Stamina</span>
              <Progress className='col-6' value={player.attributes.physical.stamina} max={20} />
              <span className='col-1'>{player.attributes.physical.stamina}</span>
            </div>
            <div className='flex'>
              <span className='col-4'>Strength</span>
              <Progress className='col-6' value={player.attributes.physical.strength} max={20} />
              <span className='col-1'>{player.attributes.physical.strength}</span>
            </div>
            <p className='stats'>Tecnical</p>
            <div className='flex'>
              <span className='col-4'>Crossing</span>
              <Progress className='col-6' value={player.attributes.tecnical.crossing} max={20} />
              <span className='col-1'>{player.attributes.tecnical.crossing}</span>
            </div>
            <div className='flex'>
              <span className='col-4'>Dribbling</span>
              <Progress className='col-6' value={player.attributes.tecnical.dribbling} max={20} />
              <span className='col-1'>{player.attributes.tecnical.dribbling}</span>
            </div>
            <div className='flex'>
              <span className='col-4'>Finishing</span>
              <Progress className='col-6' value={player.attributes.tecnical.finishing} max={20} />
              <span className='col-1'>{player.attributes.tecnical.finishing}</span>
            </div>
            <div className='flex'>
              <span className='col-4'>Heading</span>
              <Progress className='col-6' value={player.attributes.tecnical.heading} max={20} />
              <span className='col-1'>{player.attributes.tecnical.heading}</span>
            </div>
            <div className='flex'>
              <span className='col-4'>Marking</span>
              <Progress className='col-6' value={player.attributes.tecnical.marking} max={20} />
              <span className='col-1'>{player.attributes.tecnical.marking}</span>
            </div>
            <div className='flex'>
              <span className='col-4'>Passing</span>
              <Progress className='col-6' value={player.attributes.tecnical.passing} max={20} />
              <span className='col-1'>{player.attributes.tecnical.passing}</span>
            </div>
          </div>
        )
      })
    ) : (
      <div className='center'>No Players</div>
    )
    return (
      <Container>
        <h1 className='mb-3 text-center'>Players</h1>
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
