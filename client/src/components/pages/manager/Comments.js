import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Input, Label, Form, FormGroup } from 'reactstrap'
import { sendComments } from '../../../actions/CommentAction'

class Comments extends Component {
  state = {
    comment: ''
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { comment } = this.state
    const { id, teamName, name } = this.props.auth

    this.props.sendComments(id, comment, teamName, name)

  }
  render () {
    return (

      <div className='manager-card'>
        <h3 className='padd'>Send message</h3>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Input
              type='textarea'
              name='comment'
              id='comment'
              placeholder='Add message...'
              onChange={this.onChange}
            />
            <Button
              color='success'
              style={{ marginTop: '2rem' }}
              block
            >Send</Button>
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
