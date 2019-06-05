import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Input, Form, FormGroup, Alert } from 'reactstrap'
import { sendComments } from '../../../actions/CommentAction'

class Comments extends Component {
  state = {
    comment: '',
    id: '',
    visitingId: '',
    msg: null
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount() {
    this.setState({ id: this.props.auth._id})
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props
    if (error !== prevProps.error) {
      if (error.id === 'COMMENT_FAIL'){
        this.setState({ msg: error.msg.msg })
      } else {
        this.setState({ msg: null })
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { comment } = this.state
    let { teamName, name } = this.props.auth

    // if ()

    if (this.props.params.name !== undefined) {
      this.setState({ visitingId: this.props.params.name },
        () => this.props.sendComments(this.state.visitingId, this.state.id, comment.trim(), teamName, name))
    } else {
      this.props.sendComments(this.state.id, this.state.id, comment.trim(), teamName, name)
    }

    this.setState({ comment: ''})
  }

  render () {
    return (
      <div className='manager-card submit-comment'>
        <h3>Send message</h3>
        { this.state.msg ? (<Alert className='alert bg-danger text-white'>{this.state.msg}</Alert>) : null}
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Input
              type='textarea'
              name='comment'
              id='comment'
              placeholder='Add message...'
              onChange={this.onChange}
              value={this.state.comment}
            />
            <button
              disabled={!this.state.comment}
              name="send-comment"
              className={ this.state.comment ? 'btn-color' : 'btn-color bg-secondary' }
            >Send</button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

Comments.propTypes = {
  sendComments: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth.user,
  comment: state.comment,
  error: state.error
})

export default connect(mapStateToProps, { sendComments })(Comments)
