import React, { Component } from "react";
import { Card, Row } from "react-bootstrap";
import "../styles/details.css";

class DetailsComponent extends Component {
  render() {
    return (
      <Card>
        <Card.Header className="color-khaki">
          <Card.Title>Informacje o Twoim koncie</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Card.Text className="bold">Login: </Card.Text>
            {JSON.parse(localStorage.getItem("username"))}
          </Row>
          <Row>
            <Card.Text className="bold">Imię: </Card.Text>
            {JSON.parse(localStorage.getItem("firstName"))}
          </Row>
          <Row>
            <Card.Text className="bold">Nazwisko: </Card.Text>
            {JSON.parse(localStorage.getItem("lastName"))}
          </Row>
          <Row>
            <Card.Text className="bold">Rola: </Card.Text>
            {JSON.parse(localStorage.getItem("role"))}
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default DetailsComponent;
