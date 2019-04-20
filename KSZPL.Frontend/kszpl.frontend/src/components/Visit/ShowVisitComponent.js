import axios from 'axios';
import React, { Component } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { BASE_URL } from '../../constants';
import "../../styles/visit.css";
import moment from 'moment';


class ShowVisitComponent extends Component {
    constructor()
    {
        super();
        this.state = {
            dateVisit: new Date(),
            description: '', 
            place: '',
            id: null,
            patientCardId: 0,
            status: '',
            userId: 0,
            doctorName: '',
            patientName:''
        } 
    }

    componentDidMount(){
        debugger;
        axios.get( BASE_URL + `/visit/getvisit/${this.props.match.params.id}`)
            .then((response) => {
                this.setState({
                    dateVisit: response.data.dateVisit,
                    description: response.data.description,
                    place: response.data.place,
                    id: response.data.id,
                    patientCardId: response.data.patientCardId,
                    status: response.data.status,
                    userId: response.data.userId,
                    doctorName: response.data.doctorName,
                    patientName: response.data.patientName
                });
            })
            .catch(function (error) {
                console.log("err2");
                console.log(error);
            });
    }

    parseDate(date)
    {
        return (
            moment(date).format("DD-MM-YYYY") + "  " + moment(date).format("HH:mm")
        )
    }

    render(){

        return(
            <Row>
                <Form horizontal>
                    <Col sm={12}> 
                    <Form.Label className="labelVisit"> <b>  Informacje o wizycie </b>  </Form.Label>
                    </Col>
                    <Row>
                        <Col sm={5}> <Form.Label> <b> Termin:</b>  </Form.Label> </Col>
                        <Col sm={7}> <Form.Label> {this.parseDate(this.state.dateVisit)} </Form.Label> </Col>
                    </Row>
                    <Row>
                        <Col sm={5}> <Form.Label><b> Opis:</b> </Form.Label> </Col>
                        <Col sm={7}> <Form.Label> {this.state.description} </Form.Label> </Col>
                    </Row>
                    <Row>
                        <Col sm={5}> <Form.Label> <b>Pacjent:</b> </Form.Label> </Col>
                        <Col sm={7}> <Form.Label> {this.state.patientName} </Form.Label> </Col>
                    </Row>
                    <Row>
                        <Col sm={5}> <Form.Label><b>Miejsce wizyty: </b> </Form.Label> </Col>
                        <Col sm={7}> <Form.Label> {this.state.place} </Form.Label> </Col>
                    </Row>
                    <Row>
                        <Col sm={5}> <Form.Label><b> Status: </b> </Form.Label> </Col>
                        <Col sm={7}> <Form.Label> {this.state.status} </Form.Label> </Col>
                    </Row>
                    <Row>
                        <Col sm={5}> <Form.Label><b> Lekarz: </b></Form.Label> </Col>
                        <Col sm={7}> <Form.Label> {this.state.doctorName} </Form.Label> </Col>
                    </Row>
                    </Form>
            </Row>
        )
    }
}

export default withRouter(ShowVisitComponent);