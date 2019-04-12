import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

class DetailsComponent extends Component {
  render() {
    return (
      <Col>
        <Row>Username: {JSON.parse(localStorage.getItem("username"))}</Row>
        <Row>First Name: {JSON.parse(localStorage.getItem("firstName"))}</Row>
        <Row>Last Name: {JSON.parse(localStorage.getItem("lastName"))}</Row>
        <Row>Role: {JSON.parse(localStorage.getItem("role"))}</Row>
      </Col>
    );
  }
}

export default DetailsComponent;
