import React, { Component } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { withRouter } from 'react-router-dom';
import {Form, FormControl, Col, Row} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "../../styles/visit.css";

class CreateVisitComponent extends Component {

    constructor()
    {
        super();
        this.state = {
            dateVisit: new Date(),
            description: '', 
            place: '',
            id: 0,
            patientCardId: 1,
            status: '',
            userId: 1,
            patients: [],
            doctors: []
        }
    }


    componentDidMount(){
        axios.get(BASE_URL + 'visit/createvisit')
       .then((response) => {
       this.setState({
           patients: response.data.patients,
           doctors: response.data.doctors
       });
       })
    }


    createOptionsPatients = () =>{  return this.state.patients.map(patients => (
          <option value={patients.value} key={patients.value}>
            {patients.label}
          </option>
        ))
    }

    createOptionsDoctors = () =>{  return this.state.doctors.map(doctors => (
        <option value={doctors.value} key={doctors.value}>
          {doctors.label}
        </option>
      ))
    }

    onChangeDescription = (event) => {
        this.setState({description: event.target.value});
    }

    onChangePlace = (event) => {
        this.setState({place: event.target.value});
    }

    onChangeStatus = (event) => {
        this.setState({status: event.target.value});
    }

    onChangePatientCardId = (event) => {
        this.setState({patientCardId: event.target.value});
      }
    
    onChangeDoctorId = (event) => {
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
            axios.post(BASE_URL + '/visit/createvisit', {dateVisit: this.state.dateVisit, description: this.state.description, id: 0, place: this.state.place, status: this.state.status, userId: this.state.userId, patientCardId: this.state.patientCardId },axiosConfig)
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
                <Form horizontal className="formVisit">
                    <Row>
                        <Col sm={12}> <Form.Label> Termin wizyty: </Form.Label> </Col>
                        <Col sm={12}> 
                            
                            <DatePicker selected={this.state.dateVisit}  
                                        onChange={this.onChangeDateVisit} 
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="dd-MM-yyyy HH:mm"
                                        timeCaption="time" />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}> <Form.Label> Opis: </Form.Label> </Col>
                        <Col sm={11}>
                            <FormControl onChange={this.onChangeDescription}  placeholder="Opis wizyty"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}> <Form.Label> Imię i nazwisko pacjenta: </Form.Label> </Col>
                        <Col sm={12}>
                            <FormControl as="select" value={this.state.patientCardId}  onChange={this.onChangePatientCardId} >
                            {this.createOptionsPatients()}
                            </FormControl>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}> <Form.Label>Miejsce wizyty: </Form.Label> </Col>
                        <Col sm={12}>
                            <FormControl onChange={this.onChangePlace}  placeholder="Miejsce wizyty"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}> <Form.Label> Status: </Form.Label> </Col>
                        <Col sm={12}>
                            <FormControl onChange={this.onChangeStatus}  placeholder="Status wizyty"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}> <Form.Label> Imię i nazwisko lekarza: </Form.Label> </Col>
                        <Col sm={12}>
                            <FormControl as="select" value={this.state.userId} onChange={this.onChangeDoctorId} >
                            {this.createOptionsDoctors()}
                            </FormControl>
                        </Col>
                    </Row>
                    <Row>
                    <Col> <Form.Label>  </Form.Label> </Col>
                    </Row>

                    <Row>
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