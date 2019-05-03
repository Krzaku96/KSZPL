import React, { Component } from "react";
import { Table } from "react-bootstrap";
import axios from 'axios';
import { BASE_URL } from '../../constants';
import VisitComponent from "./VisitComponent";

class ListVisitsComponent extends Component{  
    state = {
            visits: [],
        } 

    redirectToListVisits = () => {
        return this.props.history.push({
          pathname: "/listvisits",
          state: {
            visits: this.state.visits
          }
        });
      }

      componentDidMount(){
        axios.get(BASE_URL + "visit/getallvisit").then(response => {
          if (response.data) {
            this.setState({ visits: response.data });
            this.redirectToListVisits();
          } 
          else 
          {
            console.log("Can't find response");
          }
        });
    }
      

    mapVisitsToShow = () => {
        return this.state.visits.map((visit,id) => (
            <VisitComponent
            key={visit.id}
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

    render() {
        return (
          <div>
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
                </tr>
              </thead>
              <tbody>{this.mapVisitsToShow()}</tbody>
            </Table>
          </div>
        );
      }
    }




export default ListVisitsComponent;