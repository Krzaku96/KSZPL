import React, { Component } from "react";
import moment from 'moment';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import CardPatientCardComponent from "./CardPatientCardComponent";
import { Form } from "react-bootstrap";
import "../../styles/patientcard.css"

class ShowHistoryTreatment extends Component{

    state = {
        visits: [],
    } 


    parseDate(date)
    {
        return (
            moment(date).format("DD-MM-YYYY") + "  " + moment(date).format("HH:mm")
        )
    }

    componentDidMount(){
        axios.get(BASE_URL + `patientcard/gethistory/${this.props.match.params.id}`).then(response => {
            console.log(response)
          if (response.data) {
            this.setState({ visits: response.data });

          } 
        });
    }

    mapVisitsToShow = () => {
        return this.state.visits.map((visit) => (
            <CardPatientCardComponent
                key={visit.id} 
                id={visit.id} 
                dateVisit={this.parseDate(visit.dateVisit)}
                description={visit.description}
                status={visit.status}
            />
        ));
    };

    render() {
            return (
              <div>
                  <Form.Label className="labelPatientCard"> <b>  Historia leczenia: </b> </Form.Label>
                    {this.mapVisitsToShow()}
              </div>
            );
    }
}

export default ShowHistoryTreatment;