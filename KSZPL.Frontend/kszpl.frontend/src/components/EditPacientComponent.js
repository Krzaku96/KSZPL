import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";

class EditPacientComponent extends Component {
  render() {
    return (
      <Card>
        <Card.Header className="color-khaki">
          <Card.Title>Edytuj pacjenta</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={this.props.editPatientOnClick}>
            <Form.Group>
              <Form.Label>Imię</Form.Label>
              <Form.Control
                type="text"
                placeholder="Imię"
                value={this.props.firstName}
                onChange={this.props.handleFirstNameChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nazwisko"
                value={this.props.lastName}
                onChange={this.props.handleLastNameChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                value={this.props.email}
                onChange={this.props.handleEmailChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Adres</Form.Label>
              <Form.Control
                type="text"
                placeholder="Adres"
                value={this.props.address}
                onChange={this.props.handleAddressChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>NIP</Form.Label>
              <Form.Control
                type="text"
                placeholder="NIP"
                value={this.props.nip}
                onChange={this.props.handleNIPChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Pesel</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pesel"
                value={this.props.pesel}
                onChange={this.props.handlePeselChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data urodzin</Form.Label>
              <Form.Control
                type="date"
                placeholder="Data urodzin"
                value={this.props.dateBirth}
                onChange={this.props.handleDateOfBirthChange}
                required
              />
            </Form.Group>
            <Button type="submit">Edytuj</Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default EditPacientComponent;
