import '../../styles/visit.css';

import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { BASE_URL } from '../../constants';


class ShowVisitComponent extends Component {
    constructor()
    {
        super();
        this.state = {
            dateVisit: new Date(),
            description: '', 
            place: '',
            id: 0,
            patientCardId: 0,
            status: '',
            userId: 0,
            doctorName: '',
            patientName:''
        } 
    }

    componentDidMount(){
        axios.get( BASE_URL + `/visit/getvisit/${this.props.match.params.id}`)
            .then((response) => {
                debugger;
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


      OnClickEdit = (visitId) => {
          debugger;
        window.location = '/visit/update/'+ visitId;
      }

      OnClickReturn = () => {
      window.location = '/searchvisit'
    }

    render(){

        return(
            <Row>
                <Form horizontal className="formVisit">
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
                    <Row>
                    <Col sm={5}> <Button onClick={() => this.OnClickReturn()} className="btn btn-light">Wroc</Button> </Col>
                    <Col sm={5}> <Button onClick={() => this.OnClickEdit(this.state.id)} className="btn btn-primary">Edytuj</Button> </Col>
                    </Row>
                    </Form>
            </Row>
        )
    }
}

export default withRouter(ShowVisitComponent);