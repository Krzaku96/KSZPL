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
              Home
            </Nav.Link>
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
            <NavDropdown title="Wizyty">
              <NavDropdown.Item onClick={this.props.redirectToListVisits}>
                Wizyty
              </NavDropdown.Item>
              <NavDropdown.Item onClick={this.props.redirectToCreateVisit}>
                Stworz wizytę
              </NavDropdown.Item>
              </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default AppBarComponent;
