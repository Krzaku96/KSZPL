import React, { Component } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Col, FormControl, Form, Row, Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "../../styles/visit.css";

class UpdateVisitComponent extends Component {
  constructor() {
    super();
    this.state = {
      dateVisit: new Date(),
      description: "",
      place: "",
      id: null,
      status: "",
      userId: 0,
      patientId: 0,
      patients: [],
      doctors: []
    };
  }

  componentDidMount() {
    axios
      .get(BASE_URL + `visit/editvisit/${this.props.match.params.id}`)
      .then(response => {
        debugger;
        this.setState({
          dateVisit: response.data.dateVisit,
          description: response.data.description,
          place: response.data.place,
          id: response.data.id,
          status: response.data.status,
          userId: response.data.userId,
          patientId: response.data.patientId,
          patients: response.data.patients,
          doctors: response.data.doctors
        });
      })
      .catch(function(error) {
        console.log("err2");
        console.log(error);
      });
  }

  createOptionsPatients = () => {
    return this.state.patients.map(patients => (
      <option value={patients.value} key={patients.value}>
        {patients.label}
      </option>
    ));
  };

  createOptionsDoctors = () => {
    return this.state.doctors.map(doctors => (
      <option value={doctors.value} key={doctors.value}>
        {doctors.label}
      </option>
    ));
  };

  onChangeDescription = event => {
    this.setState({ description: event.target.value });
  };

  onChangePlace = event => {
    this.setState({ place: event.target.value });
  };

  onChangeStatus = event => {
    this.setState({ status: event.target.value });
  };

  onChangeDateVisit = dateVisit => this.setState({ dateVisit });

  onChangePatientId = event => {
    this.setState({ patientId: event.target.value });
  };

  onChangeDoctorId = event => {
    this.setState({ userId: event.target.value });
  };

  updateVisit = event => {
    event.preventDefault();
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };
    axios
      .put(
        BASE_URL + "visit/editvisit",
        {
          dateVisit: this.state.dateVisit,
          description: this.state.description,
          id: this.state.id,
          patientId: this.state.patientId,
          place: this.state.place,
          status: this.state.status,
          userId: this.state.userId
        },
        axiosConfig
      )
      .then(() => {
        window.confirm("Wizyta została edytowana!");
        window.location = "/listvisits";
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Card>
        <Card.Header className="color-khaki">
          <Card.Title>Edytuj wizytę</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Form horizontal className="formVisit">
              <Col sm={12}>
                <Form.Label className="labelVisit">
                  {" "}
                  <b> Edycja wizyty </b>{" "}
                </Form.Label>
              </Col>
              <Row>
                <Col sm={12}>
                  {" "}
                  <Form.Label> Termin wizyty: </Form.Label>{" "}
                </Col>
                <Col sm={12}>
                  <DatePicker
                    selected={this.state.dateVisit}
                    onChange={this.onChangeDateVisit}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="dd-MM-yyyy HH:mm"
                    timeCaption="time"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  {" "}
                  <Form.Label> Opis: </Form.Label>{" "}
                </Col>
                <Col sm={11}>
                  <FormControl
                    onChange={this.onChangeDescription}
                    defaultValue={this.state.description}
                    placeholder="Opis wizyty"
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  {" "}
                  <Form.Label> Imię i nazwisko pacjenta: </Form.Label>{" "}
                </Col>
                <Col sm={12}>
                  <FormControl
                    as="select"
                    value={this.state.patientId}
                    onChange={this.onChangePatientId}
                    required
                  >
                    {this.createOptionsPatients()}
                  </FormControl>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  {" "}
                  <Form.Label>Miejsce wizyty: </Form.Label>{" "}
                </Col>
                <Col sm={12}>
                  <FormControl
                    onChange={this.onChangePlace}
                    defaultValue={this.state.place}
                    placeholder="Miejsce wizyty"
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  {" "}
                  <Form.Label> Status: </Form.Label>{" "}
                </Col>
                <Col sm={12}>
                  <FormControl
                    onChange={this.onChangeStatus}
                    defaultValue={this.state.status}
                    placeholder="Status wizyty"
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  {" "}
                  <Form.Label> Imię i nazwisko lekarza: </Form.Label>{" "}
                </Col>
                <Col sm={12}>
                  <FormControl
                    as="select"
                    onChange={this.onChangeDoctorId}
                    value={this.state.userId}
                    required
                  >
                    {this.createOptionsDoctors()}
                  </FormControl>
                </Col>
              </Row>
              <Row>
                <Col>
                  {" "}
                  <Form.Label> </Form.Label>{" "}
                </Col>
              </Row>

              <Row>
                <Col sm={2} />
                <Col sm={12}>
                  <Button
                    onClick={this.updateVisit}
                    className="btn btn-primary"
                    type="submit"
                  >
                    Edytuj wizytę
                  </Button>
                </Col>
                <Col sm={1} />
              </Row>
            </Form>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default withRouter(UpdateVisitComponent);
