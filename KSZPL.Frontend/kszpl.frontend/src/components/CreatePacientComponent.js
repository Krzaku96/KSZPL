import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";

class CreatePacientComponent extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Add patient</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.props.addPatientOnClick}>
            <Form.Group>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                onChange={this.props.handleFirstNameChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                onChange={this.props.handleLastNameChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                onChange={this.props.handleEmailChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={this.props.handleAddressChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>NIP</Form.Label>
              <Form.Control
                type="text"
                placeholder="NIP"
                onChange={this.props.handleNIPChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pesel</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pesel"
                onChange={this.props.handlePeselChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of birth</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date of birth"
                onChange={this.props.handleDateOfBirthChange}
              />
            </Form.Group>
            <Button type="submit">Add</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreatePacientComponent;
