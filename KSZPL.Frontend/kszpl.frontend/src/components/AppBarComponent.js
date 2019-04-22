import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "../styles/sidebar.css";

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
              Home
            </Nav.Link>
            {this.props.role === "Receptionist" ? (
              <NavDropdown className="color-white" title="Pacients">
                <NavDropdown.Item onClick={this.props.redirectToAddPatient}>
                  Dodaj pacjenta
                </NavDropdown.Item>
                <NavDropdown.Item onClick={this.props.showPatients}>
                  Lista pacjentów
                </NavDropdown.Item>
              </NavDropdown>
            ) : null}
            {this.props.role === null ? null : (
              <NavDropdown className="color-white" title="Your account">
                <NavDropdown.Item onClick={this.props.redirectToDetails}>
                  Details
                </NavDropdown.Item>
                {this.props.role === "Admin" ? (
                  <div>
                    <NavDropdown.Item onClick={this.props.redirectToAddUser}>
                      Add user
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={this.props.showUsersOnClick}>
                      Show users
                    </NavDropdown.Item>
                  </div>
                ) : null}
                <NavDropdown.Item onClick={this.props.redirectToUpdateUser}>
                  Change password
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={this.props.logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default AppBarComponent;
