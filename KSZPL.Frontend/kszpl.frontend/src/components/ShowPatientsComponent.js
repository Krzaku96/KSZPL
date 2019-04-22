import React, { Component } from "react";
import PatientComponent from "./PatientComponent";
import { Table } from "react-bootstrap";

class ShowPatientsComponent extends Component {
  mapPatientsToShow = () => {
    return this.props.location.state.patients.map((patient,id) => (
      <PatientComponent
        key={id}
        id={id+1}
        firstName={patient.firstName}
        lastName={patient.lastName}
        dateBirth={patient.dateBirth}
        pesel={patient.pesel}
      />
    ));
  };

  render() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of birth</th>
              <th>Pesel</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.mapPatientsToShow()}</tbody>
        </Table>
      </div>
    );
  }
}

export default ShowPatientsComponent;
