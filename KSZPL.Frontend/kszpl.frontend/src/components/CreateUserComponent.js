import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";

class CreateUserComponent extends Component {
  render() {
    return (
      <Card>
        <Card.Header className="color-khaki">
          <Card.Title>Dodaj użytkownika</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.props.addUserOnClick}>
            <Form.Group>
              <Form.Label>Imię</Form.Label>
              <Form.Control
                type="text"
                placeholder="Imię"
                onChange={this.props.handleFirstNameChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nazwisko"
                onChange={this.props.handleLastNameChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Login</Form.Label>
              <Form.Control
                type="text"
                placeholder="Login"
                onChange={this.props.handleUsernameChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                type="password"
                placeholder="Hasło"
                onChange={this.props.handlePasswordChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rola</Form.Label>
              <Form.Control as="select" onChange={this.props.handleRoleChange}>
                <option value=''></option>
                <option>Recepcjonista</option>
                <option>Doktor</option>
                <option>Admin</option>
              </Form.Control>
            </Form.Group>
            <Button type="submit">Dodaj</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateUserComponent;
