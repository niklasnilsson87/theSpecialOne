import React, { Component } from 'react'
import { Container } from 'reactstrap'
import Manager from './Manager'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Comments from './Comments'
import { getComments } from '../../../actions/CommentAction'
import axios from 'axios'

class viewManager extends Component {
  state = {
    id: null,
    user: []
  }

  componentDidMount() {
    this.loadUser()
    this.props.getComments(this.props.match.params.name)
  }

  // componentDidUpdate() {
  //   console.log(this.state.user.name)
  // }

  loadUser() {
    axios.get('/api/edit').then(res => {
      this.setState({ user: res.data.find(user => user._id === this.props.match.params.name)})
    })
  }

  render () {
    const { name, email, teamName, description, favPlayer, favTeam, totalPoints } = this.state.user
    const { comments } = this.props.comment
    const commentCard = this.props.comment.comments ? (
      comments.map(comment => {
        return (
          <div className='manager-card comment' key={comment._id}>
            <h3 className='player-name'>{comment.user}</h3>
            <div className="player-contact">
              <span>{comment.date.substring(0, 10)}</span>
              <span>{comment.date.substring(11, 16)}</span>
              <span>{comment.teamName}</span>
            </div>
            <div className='padd'>
              <p>{comment.comment}</p>
            </div>
          </div>
          )
        })
        ) : 
        <p className='center'>no comments yet</p>
    return (
      <Container>
        <div className='manager-card' >
          <h2 className='player-name'>{name}</h2>
          <div className='mb-2' style={{ display: 'flex', padding: '7px' }}>
            <div className='img' style={{ display: 'inline-block', width: '100px', border: '2px solid', textAlign: 'center', borderRadius: '6px', height: '150px' }}>Image</div>
            <div className='manager-info'>
              <p>Email: {email}</p>
              <p>Team: {teamName}</p>
              <p>Favorite team: {favTeam}</p>
              <p>Favorite player: {favPlayer}</p>
              <p>My total points is: {totalPoints}</p>
            </div>
          </div>
          <hr />
          <h5 className='ml-2'>Description</h5>

          <div style={{ textAlign: 'center', padding: '8px' }}>
            {description}
          </div>
        </div>

        <div className="comments">
          <h2 className='mb-4 mt-4 text-center'>Comments</h2>
          {commentCard}
        </div>
        <Comments param={this.props.match.params.name}/>
      </Container>
    )
  }
}

viewManager.propTypes = {
  getComments: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  comment: state.comment
})


export default connect(mapStateToProps, { getComments })(viewManager)
