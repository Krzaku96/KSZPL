import React, { Component } from "react";
import { Card, Col } from "react-bootstrap";

class UserComponent extends Component {
  render() {
    return (
      <Card>
        <Card.Body>
          <Col>{this.props.username}</Col>
          <Col>{this.props.firstName}</Col>
          <Col>{this.props.lastName}</Col>
          <Col>{this.props.role}</Col>
        </Card.Body>
      </Card>
    );
  }
}

export default UserComponent;
