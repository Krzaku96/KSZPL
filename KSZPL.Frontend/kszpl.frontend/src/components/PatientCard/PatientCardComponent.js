import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from 'axios';
import { BASE_URL } from "../../constants";
import moment from 'moment';

class PatientCardComponent extends Component{

    deletePatientCard = () => {
        if (window.confirm('Na pewno chcesz usunąć wizytę?'))
            axios.delete(BASE_URL + `patientcard/deletepatientcard/` + this.props.id)
                .then(() => {
                    window.confirm('Karta pacjenta została usunięta!');
                    window.location = '/listpatientcards'
                })
            }

    morePatientCard = () => {
        window.location = '/patientcard/showhistory/' + this.props.id;
    }


    parseDate(date)
    {
        return (
            moment(date).format("DD-MM-YYYY") + "  " + moment(date).format("HH:mm")
        )
    }

    render() {
        return(
        <tr>
            <td>{this.props.nr}</td>
            <td>{this.props.patientName}</td>
            <td>{this.props.doctorName}</td>
            <td>{this.parseDate(this.props.dateLastVisit)}</td>
            <td>{this.parseDate(this.props.dateRegister)}</td>
            <td>
            <Button variant="primary" onClick={() => this.morePatientCard()}>Więcej</Button>
            <Button variant="danger" onClick={() => this.deletePatientCard()}>Usuń</Button>
            </td>
        </tr>
        );
    }
}

export default PatientCardComponent;