import React, { Component } from "react";
import PatientComponent from "./PatientComponent";
import { Table } from "react-bootstrap";
import moment from 'moment';

class ShowPatientsComponent extends Component {
  mapPatientsToShow = () => {
    return this.props.location.state.patients.map((patient,id) => (
      <PatientComponent
        key={id}
        nr={id+1}
        id={patient.id}
        firstName={patient.name}
        lastName={patient.surname}
        dateBirth= {this.parseDate(patient.dateBirth)}
        pesel={patient.pesel}
        address={patient.address}
        nip={patient.nip}
        dateRegister={patient.dateRegister}
        email={patient.email}
      />
    ));
  };


  parseDate(date)
  {
      return (
          moment(date).format("DD-MM-YYYY")
      )
  }

  render() {
    return (
      <div>
        <Table striped bordered hover variant-dark>
          <thead className="color-khaki color-black">  
            <tr>
              <th>#</th>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>Data urodzin</th>
              <th>Pesel</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>{this.mapPatientsToShow()}</tbody>
        </Table>
      </div>
    );
  }
}

export default ShowPatientsComponent;
