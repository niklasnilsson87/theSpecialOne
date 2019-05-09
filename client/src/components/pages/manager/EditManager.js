import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Input, Label, Form, FormGroup } from 'reactstrap';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateDescription } from '../../../actions/editActions'

class Manager extends Component {
  state = {
    modal: false,
    description: this.props.auth.description,
    favPlayer: this.props.auth.favPlayer,
    favTeam: this.props.auth.favTeam
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  descChange = (e) => {
    this.setState({ description: e.target.value })
  }

  playerChange = (e) => {
    this.setState({ favPlayer: e.target.value })
  }

  teamChange = (e) => {
    this.setState({ favTeam: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { description, favPlayer, favTeam } = this.state
    const { email } = this.props.auth

    this.props.updateDescription(description, favPlayer, favTeam, email)

    this.toggle()
  }

  render () {
    return (
      <div>
       <button
        className='btn-color'
        onClick={this.toggle} 
      >
      Edit profile
      </button>

      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
      >
        <ModalHeader
          toggle={this.toggle}
        >
          Edit profile
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
            <Label for="favTeam">Favorit Team</Label>
            <Input
                type="text"
                name="favTeam"
                id="favTeam"
                placeholder="Add favorit Team..."
                onChange={this.teamChange}
                value={this.state.favTeam}
              />
            <Label for="favPlayer">Favorit Player</Label>
            <Input
                type="text"
                name="favPlayer"
                id="favPlayer"
                placeholder="Add favorit player..."
                onChange={this.playerChange}
                value={this.state.favPlayer}
              />
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="Add description..."
                onChange={this.descChange}
                value={this.state.description}
              />
              <Button
                color="success"
                style={{marginTop: '2rem'}}
                block
              >Submit</Button>
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
