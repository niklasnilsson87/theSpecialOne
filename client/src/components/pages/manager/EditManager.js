import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateDescription } from '../../../actions/editActions'

class Manager extends Component {
  state = {
    modal: false,
    name: ''
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { name } = this.state
    const { email } = this.props.auth

    this.props.updateDescription(name, email)

    this.toggle()
  }

  render () {
    return (
      <div>
       <Button
        color="success"
        style={{marginBottom: '2rem'}}
        onClick={this.toggle} 
      >
      Add description
      </Button>

      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
      >
        <ModalHeader
          toggle={this.toggle}
        >
          Add description about yourself
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Input
                type="textarea"
                name="name"
                id="name"
                placeholder="Add description..."
                onChange={this.onChange}
              />
              <Button
                color="success"
                style={{marginTop: '2rem'}}
                block
              >Submit description</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      </div>
    )
  }
}

Manager.propTypes = {
  auth: PropTypes.object.isRequired,
  updateDescription: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth.user
})

export default connect(mapStateToProps, { updateDescription })(Manager)
