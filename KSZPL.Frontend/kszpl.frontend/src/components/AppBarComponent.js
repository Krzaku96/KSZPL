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
            <Nav.Link className="color-white" href="#home">
              Home
            </Nav.Link>
            <Nav.Link className="color-white" href="#link">
              Link
            </Nav.Link>
            <NavDropdown className="color-white" title="Your account">
              <NavDropdown.Item href="#action/3.1">Details</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default AppBarComponent;
