import React, { Component } from "react";
import { Card } from "react-bootstrap";

class ErrorComponent extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Błąd</Card.Title>
        </Card.Header>
        <Card.Body>
          Wystąpił błąd: {this.props.location.state.errorCode}
        </Card.Body>
      </Card>
    );
  }
}

export default ErrorComponent;
