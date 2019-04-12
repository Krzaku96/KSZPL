import React, { Component } from "react";
import { Card, Button, Form } from "react-bootstrap";
import "../styles/login.css";

class LoginComponent extends Component {
  render() {
    return (
      <Card className="card">
        <Card.Header>
          <Card.Title>Log in to your account</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.props.handleLoginSubmit}>
            <Form.Group name="username">
              <Form.Label>Username</Form.Label>
              <Form.Control onChange={this.props.handleUsernameChange} type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group name="password">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={this.props.handlePasswordChange} type="password" placeholder="Enter password" />
            </Form.Group>
            <Button type="submit">Login</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default LoginComponent;
