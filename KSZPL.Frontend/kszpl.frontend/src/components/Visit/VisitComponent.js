import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from 'axios';
import { BASE_URL } from "../../constants";
import moment from 'moment';

class VisitComponent extends Component{

  deleteVisit = () => {
    if (window.confirm('Na pewno chcesz usunąć wizytę?'))
        axios.delete(BASE_URL + `visit/deletevisit/` + this.props.id)
            .then(() => {
                window.confirm('Wizyta została usunięta!');
                window.location = '/listvisits'
            })
}

handleEditClick = () => {
  window.location = '/visit/update/' + this.props.id;
};

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
        <td>{this.parseDate(this.props.dateVisit)}</td>
        <td>{this.props.description}</td>
        <td>{this.props.place}</td>
        <td>{this.props.patientName}</td>
        <td>{this.props.status}</td>
        <td>{this.props.doctorName}</td>
        <td>
          <Button variant="primary" onClick={this.handleEditClick}>Edytuj</Button>
          <Button variant="danger" onClick={() => this.deleteVisit()}>Usuń</Button>
        </td>
      </tr>
        );
    }
}

export default VisitComponent;