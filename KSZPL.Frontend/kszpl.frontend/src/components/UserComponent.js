import React, { Component } from "react";
import { Button } from "react-bootstrap";

class UserComponent extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.firstName}</td>
        <td>{this.props.lastName}</td>
        <td>{this.props.username}</td>
        <td>{this.props.role}</td>
        <td>
          <Button variant="primary">Edytuj</Button>
          <Button variant="danger">Usuń</Button>
        </td>
      </tr>
    );
  }
}

export default UserComponent;
