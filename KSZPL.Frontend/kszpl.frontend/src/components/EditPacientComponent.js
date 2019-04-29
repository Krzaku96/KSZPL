import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";

class EditPacientComponent extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Edit patient</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.props.editPatientOnClick}>
            <Form.Group>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                value={this.props.firstName}
                onChange={this.props.handleFirstNameChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                value={this.props.lastName}
                onChange={this.props.handleLastNameChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                value={this.props.email}
                onChange={this.props.handleEmailChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                value={this.props.address}
                onChange={this.props.handleAddressChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>NIP</Form.Label>
              <Form.Control
                type="text"
                placeholder="NIP"
                value={this.props.nip}
                onChange={this.props.handleNIPChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pesel</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pesel"
                value={this.props.pesel}
                onChange={this.props.handlePeselChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date of birth"
                value={this.props.dateBirth}
                onChange={this.props.handleDateOfBirthChange}
              />
            </Form.Group>
            <Button type="submit">Edit</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default EditPacientComponent;
