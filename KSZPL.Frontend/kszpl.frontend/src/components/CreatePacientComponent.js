import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";

class CreatePacientComponent extends Component {
  render() {
    return (
      <Card>
        <Card.Header className="color-khaki">
          <Card.Title>Dodaj pacjenta</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.props.addPatientOnClick}>
            <Form.Group>
              <Form.Label>Imię</Form.Label>
              <Form.Control
                type="text"
                placeholder="Imię"
                onChange={this.props.handleFirstNameChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nazwisko"
                onChange={this.props.handleLastNameChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                onChange={this.props.handleEmailChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Adres</Form.Label>
              <Form.Control
                type="text"
                placeholder="Adres"
                onChange={this.props.handleAddressChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>NIP</Form.Label>
              <Form.Control
                type="text"
                placeholder="NIP"
                onChange={this.props.handleNIPChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pesel</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pesel"
                onChange={this.props.handlePeselChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data urodzin</Form.Label>
              <Form.Control
                type="date"
                placeholder="Data urodzin"
                onChange={this.props.handleDateOfBirthChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Doktor</Form.Label>
              <Form.Control
                as="select"
                placeholder="Doktor"
                onChange={this.props.handleDoctorChange}
                required
              >
                <option value="" />
                {this.props.createOptionsDoctors()}
              </Form.Control>
            </Form.Group>
            <Button type="submit">Dodaj</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreatePacientComponent;
