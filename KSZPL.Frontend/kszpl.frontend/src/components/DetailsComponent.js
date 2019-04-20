import React, { Component } from "react";
import { Card, Row } from "react-bootstrap";
import "../styles/details.css";

class DetailsComponent extends Component {
  render() {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Details of your account</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Card.Text className="bold">Username: </Card.Text>
            {JSON.parse(localStorage.getItem("username"))}
          </Row>
          <Row>
            <Card.Text className="bold">First name: </Card.Text>
            {JSON.parse(localStorage.getItem("firstName"))}
          </Row>
          <Row>
            <Card.Text className="bold">Last name: </Card.Text>
            {JSON.parse(localStorage.getItem("lastName"))}
          </Row>
          <Row>
            <Card.Text className="bold">Role: </Card.Text>
            {JSON.parse(localStorage.getItem("role"))}
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default DetailsComponent;
