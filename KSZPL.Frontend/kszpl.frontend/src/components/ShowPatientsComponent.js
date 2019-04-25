import React, { Component } from "react";
import PatientComponent from "./PatientComponent";
import { Table } from "react-bootstrap";

class ShowPatientsComponent extends Component {
  mapPatientsToShow = () => {
    return this.props.location.state.patients.map((patient,id) => (
      <PatientComponent
        key={id}
        nr={id+1}
        id={patient.id}
        firstName={patient.name}
        lastName={patient.surname}
        dateBirth={patient.dateBirth}
        pesel={patient.pesel}
        address={patient.address}
        nip={patient.nip}
        dateRegister={patient.dateRegister}
        email={patient.email}
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
