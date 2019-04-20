import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";

class UpdateUserComponent extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Change password</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.props.updateUserOnClick}>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={this.props.handlePasswordChange}
              />
            </Form.Group>
            <Button type="submit">Change password</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateUserComponent;
