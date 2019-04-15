import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";

class CreateUserComponent extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Add user</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.props.addUserOnClick}>
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
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={this.props.handleUsernameChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={this.props.handlePasswordChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control as="select" onChange={this.props.handleRoleChange}>
                <option>Receptionist</option>
                <option>Doctor</option>
                <option>Admin</option>
              </Form.Control>
            </Form.Group>
            <Button type="submit">Add</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateUserComponent;
