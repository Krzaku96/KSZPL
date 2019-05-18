import '../styles/sidebar.css';

import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

class AppBarComponent extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Brand className="color-white">KSZPL</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="mr-auto">
            <Nav.Link
              className="color-white"
              onClick={this.props.redirectToHome}
            >
              Strona głowna
            </Nav.Link>
            <NavDropdown className="color-white" title="Twoje konto">
              <NavDropdown.Item onClick={this.props.redirectToDetails}>
                Informacje
              </NavDropdown.Item>
              {this.props.role === "Admin" ? (
                <div>
                  <NavDropdown.Item onClick={this.props.redirectToAddUser}>
                    Dodaj użytkownika
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={this.props.showUsersOnClick}>
                    Wyświetl informacje o użytkowniku
                  </NavDropdown.Item>
                </div>
              ) : null}
              <NavDropdown.Item onClick={this.props.redirectToUpdateUser}>
                Zmień hasło
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.props.logout}>
                Wyloguj się
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Wizyty">
              <NavDropdown.Item onClick={this.props.redirectToListVisits}>
                Harmonogram wizyt
              </NavDropdown.Item>
              <NavDropdown.Item onClick={this.props.redirectToCreateVisit}>
                Stworz wizytę
              </NavDropdown.Item>
              <NavDropdown.Item onClick={this.props.redirectToSearchVisit}>
                Wyszukaj wizytę
              </NavDropdown.Item>
              </NavDropdown>
            
              <NavDropdown className="color-white" title="Pacjenci">
                <NavDropdown.Item onClick={this.props.redirectToAddPatient}>
                  Dodaj pacjenta
                </NavDropdown.Item>
                <NavDropdown.Item onClick={this.props.showPatients}>
                  Lista pacjentów
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown className="color-white" title="Karty pacjentow">
                <NavDropdown.Item onClick={this.props.redirectToListPatientCards}>
                  Lista kart pacjentow
                </NavDropdown.Item>
              </NavDropdown>
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default AppBarComponent;
