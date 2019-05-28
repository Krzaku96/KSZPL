import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";

class EditUserComponent extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Edytuj pacjenta</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.props.editUserOnClick}>
            <Form.Group>
              <Form.Label>Imię</Form.Label>
              <Form.Control
                type="text"
                placeholder="Imię"
                value={this.props.firstName}
                onChange={this.props.handleFirstNameChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nazwisko"
                value={this.props.lastName}
                onChange={this.props.handleLastNameChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                disabled
                value={this.props.username}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Rola</Form.Label>
              <Form.Control as="select" onChange={this.props.handleRoleChange}>
                <option value="" />
                <option>Recepcjonista</option>
                <option>Doktor</option>
                <option>Admin</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                type="password"
                placeholder="Hasło"
                onChange={this.props.handlePasswordChange}
              />
            </Form.Group>
            <Button type="submit">Edytuj</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default EditUserComponent;
