import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";

class UpdateUserComponent extends Component {
  render() {
    return (
      <Card>
        <Card.Header className="color-khaki">
          <Card.Title>Zmień hasło</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.props.updateUserOnClick}>
            <Form.Group>
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                type="password"
                placeholder="Hasło"
                onChange={this.props.handlePasswordChange}
                required
              />
            </Form.Group>
            <Button type="submit">Zmień hasło</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateUserComponent;
