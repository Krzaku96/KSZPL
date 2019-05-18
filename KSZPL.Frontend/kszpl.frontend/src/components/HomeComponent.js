import React, { Component } from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import VisitComponent from "./Visit/VisitComponent";
import { Table } from "react-bootstrap";

class HomeComponent extends Component {
  state = {
    visits: [],
    role: ''
  };

  componentDidMount = () => {
    axios.get(BASE_URL + "visit/visitsForToday").then(response => {
      if (response.data) {
        this.setState({ visits: response.data });
      } else {
        console.log("Can't find response");
      }
    });
  };

  mapVisitsToShow = () => {
    return this.state.visits.map((visit, id) => (
      <VisitComponent
        key={visit.id}
        nr={id+1}
        id={visit.id}
        dateVisit={visit.dateVisit}
        description={visit.description}
        place={visit.place}
        patientName={visit.patientName}
        status={visit.status}
        doctorName={visit.doctorName}
      />
    ));
  };

  getRole = () => {
    if(this.props.role === "Doctor")
    {
      this.state.role = "doktor"
    }
    else if(this.props.role === "Admin")
    {
      this.state.role = "admin"
    }
    else if(this.props.role === "Receptionist")
    {
      this.state.role = "recepcjonista"
    }
    return this.state.role;
  }

  render() {
    return (
      <div>
        Jesteś zalogowany jako {this.getRole()}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th> </th>
              <th>Termin</th>
              <th>Opis</th>
              <th>Miejsce</th>
              <th>Pacjent</th>
              <th>Status</th>
              <th>Doktor</th>
              <th />
            </tr>
          </thead>
          <tbody>{this.mapVisitsToShow()}</tbody>
        </Table>
      </div>
    );
  }
}

export default HomeComponent;
