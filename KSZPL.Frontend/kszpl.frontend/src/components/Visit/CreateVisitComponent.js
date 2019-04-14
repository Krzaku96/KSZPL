import React, { Component } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import {Form, FormControl, Col, Row} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class CreateVisitComponent extends Component {
    constructor()
    {
        super();
        this.state = {
            dateVisit: undefined,
            description: '', 
            place: '',
            id: null,
            patientCardId: 0,
            status: '',
            userId: 0,
        }
    }


    onChangeDescription = (event) => {
        this.setState({description: event.target.value});
    }

    onChangePatientCardId = (event) => {
        this.setState({patientCardId: event.target.value});
    }

    onChangePlace = (event) => {
        this.setState({place: event.target.value});
    }

    onChangeStatus = (event) => {
        this.setState({status: event.target.value});
    }
    
    onChangeUserId = (event) => {
        this.setState({userId: event.target.value});
    }

    onChangeDateVisit = dateVisit => this.setState({ dateVisit })


    addVisit = event => {
        event.preventDefault();
        let axiosConfig = {
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
            }
        };
            axios.post(BASE_URL + '/visit/createvisit', {dateVisit: this.state.dateVisit, description: this.state.description, id: 0, patientCardId: this.state.patientCardId, place: this.state.place, status: this.state.status, userId: this.state.userId },axiosConfig)
            .then(()=>{
                window.confirm('Wizyta została dodana!');
            })
            .catch((err)=>{
                console.log(err);
            });
    }


    render(){


        return(
            <Row>
                <Form horizontal>
                    <Row>
                        <Col sm={4}> </Col>
                            <Col sm={8}>
                                
                            </Col>
                    </Row>
                    <Row> {""} </Row>
                    <Row>
                        <Col componentClass={Form.Label} sm={12}> Termin wizyty: </Col>
                        <Col sm={12}> 
                            
                            <DatePicker selected={this.state.dateVisit}  
                                        onChange={this.onChangeDateVisit} 
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="MMMM d, yyyy hh:mm"
                                        timeCaption="time" />
                        </Col>
                    </Row>
                    <Row>
                        <Col componentClass={Form.Label} sm={12}> Opis: </Col>
                        <Col sm={12}>
                            <FormControl onBlur={this.onChangeDescription}  placeholder="Opis wizyty"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col componentClass={Form.Label} sm={12}> Id karty pacjenta: </Col>
                        <Col sm={12}>
                            <FormControl onBlur={this.onChangePatientCardId}  placeholder="Id karty pacjenta"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col componentClass={Form.Label} sm={12}> Miejsce wizyty: </Col>
                        <Col sm={12}>
                            <FormControl onBlur={this.onChangePlace}  placeholder="Miejsce wizyty"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col componentClass={Form.Label} sm={12}> Status: </Col>
                        <Col sm={12}>
                            <FormControl onBlur={this.onChangeStatus}  placeholder="Status wizyty"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col componentClass={Form.Label} sm={12}> Id lekarza: </Col>
                        <Col sm={12}>
                            <FormControl onBlur={this.onChangeUserId}  placeholder="Identyfikator lekarza"/>
                        </Col>
                    </Row>


                    <Row>
                        <br></br>
                        <Col sm={2}></Col>
                        <Col sm={12}>
                            <Button onClick={this.addVisit} className="btn btn-primary" type="submit">Dodaj wizytę</Button>
                        </Col>
                        <Col sm={1}></Col>
                    </Row>
                    </Form>
            </Row>
        )
    }

   
}

export default withRouter(CreateVisitComponent);