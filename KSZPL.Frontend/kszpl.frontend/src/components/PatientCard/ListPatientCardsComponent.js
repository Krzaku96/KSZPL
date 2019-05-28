import React, { Component } from "react";
import { Table } from "react-bootstrap";
import axios from 'axios';
import { BASE_URL } from '../../constants';
import PatientCardComponent from './PatientCardComponent';

class ListPatientCardsComponent extends Component{

    state = {
        patientCards: [],
    } 

    redirectToListPatientCards = () => {
        return this.props.history.push({
          pathname: "/listpatientcards",
          state: {
            patientCards: this.state.patientCards
          }
        });
      }


    componentDidMount(){
        axios.get(BASE_URL + "patientcard/getallpatientCards").then(response => {
          if (response.data) {
            this.setState({ patientCards: response.data });
            this.redirectToListPatientCards();
          } 
        });
    }

    mapPatientCardsToShow = () => {
        return this.state.patientCards.map((patientCard) => (
            <PatientCardComponent
            key={patientCard.id}
            id={patientCard.id}
            patientName={patientCard.patientName}
            doctorName={patientCard.doctorName}
            dateLastVisit={patientCard.dateLastVisit}
            dateRegister={patientCard.dateRegister}
            
            />
        ));
    };

    render() {
        return (
          <div>
            <Table striped bordered hover variant="dark">
              <thead className="color-khaki color-black"> 
                <tr>
                  <th> </th>
                  <th>Imię i nazwisko pacjenta</th>
                  <th>Imię i nazwisko doktora</th>
                  <th>Data ostatniej wizyty</th>
                  <th>Data rejestracji</th>
                </tr>
              </thead>
              <tbody>{this.mapPatientCardsToShow()}</tbody>
            </Table>
          </div>
        );
      }
}

export default ListPatientCardsComponent;