import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

class PatientComponent extends Component {
  redirectToUpdatePatient = () => {
    return this.props.history.push({
      pathname: "/editPatient",
      state: {
        id: this.props.id,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        dateBirth: this.props.dateBirth,
        pesel: this.props.pesel,
        address: this.props.address,
        nip: this.props.nip,
        dateRegister: this.props.dateRegister,
        email: this.props.email
      }
    });
  };
  render() {
    return (
      <tr>
        <td>{this.props.nr}</td>
        <td>{this.props.firstName}</td>
        <td>{this.props.lastName}</td>
        <td>{this.props.dateBirth}</td>
        <td>{this.props.pesel}</td>
        <td>
          <Button variant="primary" onClick={this.redirectToUpdatePatient}>
            Update
          </Button>
          <Button variant="danger">Delete</Button>
        </td>
      </tr>
    );
  }
}

export default withRouter(PatientComponent);
