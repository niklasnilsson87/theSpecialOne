import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import EditManager from './EditManager'
import Comments from './Comments'
import { getComments } from '../../../actions/CommentAction'
import { loadUser } from '../../../actions/helpers/helperAction'
import { Link } from 'react-router-dom'

class Manager extends Component {
  state = {
    selectedFile: null,
    isParamsUndefined: this.props.match.params.name === undefined,
    isOwner: true,
    path: '',
    user: []
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    if (this.state.isParamsUndefined) {
      this.setState({ user: this.props.auth.user}, () => this.props.getComments(this.state.user._id))
    } else {
      loadUser(this.props.match.params.name).then((userObj) => {
      this.setState({ user: userObj, isOwner: false}, () => this.props.getComments(this.state.user._id))
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.path !== this.state.path) {
      window.scrollTo(0, 0)
      this.setState({ user: this.props.auth.user, isOwner: true }, () => this.props.getComments(this.state.user._id))
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    window.scrollTo(0, 0)
    if (nextProps.match.path !== prevState.path && !undefined) {
      return { path: nextProps.match.path }
    }
    else return null;
  }

  onclick = (id) => {
    loadUser(id).then((userObj) => {
      this.setState({ user: userObj, isOwner: false}, () => this.props.getComments(this.state.user._id))
    })
  }

  render () {
    const { name, email, teamName, description, favPlayer, favTeam, totalPoints } = this.state.user
    const { comments } = this.props.comment
    const commentCard = this.props.comment.comments ? (
      comments.map(comment => {
        return (
          <div className='manager-card comment' key={comment._id}>
            <Link to={`/user/${comment.userid}`}>
              <h4 className='player-name' onClick={() => this.onclick(comment.userid)}>{comment.user}</h4>
            </Link>
            <div className="player-contact">
              <span>{comment.date.substring(0, 10)}</span>
              <span>{comment.date.substring(11, 16)}</span>
              <span>{comment.teamName}</span>
            </div>
            <div className='comment-area'>
              <p>{comment.comment}</p>
            </div>
          </div>
          )
        })
        ) : 
        <p className='center'>no comments yet</p>
    return (
      <Container>
        <h1 className="mb-3 text-center">Manager</h1>
        <div className="manager">
        <div className='manager-card'>
          <div className="flex align-items-center">
          <h2 className='player-name'>{name}</h2>
          <div className='button' style={{ textAlign: 'center' }}>
            <EditManager isOwner={this.state.isOwner}>Change profile</EditManager>
          </div>
          </div>
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

        </div>
        <div className="comments">
          <h2 className='mb-4 mt-4 text-center'>Comments</h2>
          {commentCard}
        </div>
        <Comments params={this.props.match.params} isOwner={this.state.isOwner} />
      </Container>
    )
  }
}

Manager.propTypes = {
  getComments: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  comment: state.comment
})

export default connect(mapStateToProps, { getComments, loadUser })(Manager)
