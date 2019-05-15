import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Input, Form, FormGroup } from 'reactstrap'
import { sendComments } from '../../../actions/CommentAction'

class Comments extends Component {
  state = {
    comment: '',
    id: ''
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount() {
    this.setState({ id: this.props.auth._id})
    console.log(this.props.params.name)
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { comment } = this.state
    let { teamName, name } = this.props.auth

    if (this.props.params.name !== undefined) {
      this.setState({ id: this.props.params.name },
        () => this.props.sendComments(this.state.id, comment, teamName, name))
    } else {
      this.props.sendComments(this.state.id, comment, teamName, name)
    }

    this.setState({ comment: ''})
  }

  render () {
    return (
      <div className={this.props.isOwner ? 'manager-card comment' : 'visit-card comment'}>
        <h3>Send message</h3>
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
              className='btn-color'
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
  comment: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth.user,
  comment: state.comment
})

export default connect(mapStateToProps, { sendComments })(Comments)
