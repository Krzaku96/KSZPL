import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";
import "../styles/login.css";

class LoginComponent extends Component {
  render() {
    return (
      <Card className="card">
        <Card.Header className="color-khaki">
          <Card.Title>Zaloguj się na swoje konto</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.props.handleLoginSubmit}>
            <Form.Group name="username">
              <Form.Label>Login</Form.Label>
              <Form.Control onChange={this.props.handleUsernameChange} type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group name="password">
              <Form.Label>Hasło</Form.Label>
              <Form.Control onChange={this.props.handlePasswordChange} type="password" placeholder="Enter password" />
            </Form.Group>
            <Button type="submit">Zaloguj się</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default LoginComponent;
