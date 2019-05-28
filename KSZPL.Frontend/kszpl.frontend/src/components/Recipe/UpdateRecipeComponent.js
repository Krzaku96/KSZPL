import React, { Component } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Col, FormControl, Form, Row, Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

class UpdateRecipeComponent extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      dateRelease: new Date(),
      prescribedMedicines: "",
      doctorName: "",
      patientName: "",
      patientCardId: 0,
      userId: 0,
      visitId: 0
    };
  }

  componentDidMount() {
    axios
      .get(BASE_URL + `recipe/editrecipe/${this.props.match.params.id}`)
      .then(response => {
        debugger;
        this.setState({
          id: response.data.id,
          dateRelease: response.data.dateRelease,
          prescribedMedicines: response.data.prescribedMedicines,
          doctorName: response.data.doctorName,
          patientName: response.data.patientName,
          patientCardId: response.data.patientCardId,
          userId: response.data.userId,
          visitId: response.data.visitId
        });
      })
      .catch(function() {});
  }

  redirectToHome = () => {
    return this.props.history.push({
      pathname: "/"
    });
  };

  onChangePrescribedMedicines = event => {
    this.setState({ prescribedMedicines: event.target.value });
  };

  onChangeDateVisit = dateRelease => this.setState({ dateRelease });

  updateRecipe = event => {
    event.preventDefault();
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };
    axios
      .put(
        BASE_URL + "recipe/editrecipe",
        {
          dateRelease: this.state.dateRelease,
          prescribedMedicines: this.state.prescribedMedicines,
          id: this.state.id,
          patientCardId: this.state.patientCardId,
          userId: this.state.userId,
          visitId: this.state.visitId
        },
        axiosConfig
      )
      .then(() => {
        window.confirm("Recepta została edytowana!");
        this.redirectToHome();
      })
      .catch(err => {});
  };

  render() {
    return (
      <Card>
        <Card.Body>
          <Row>
            <Form horizontal className="formVisit">
              <Row>
                <Col sm={12}>
                  {" "}
                  <Form.Label> Termin ważności: </Form.Label>{" "}
                </Col>
                <Col sm={12}>
                  <DatePicker
                    selected={this.state.dateRelease}
                    onChange={this.onChangeDateRelease}
                    dateFormat="dd-MM-yyyy"
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  {" "}
                  <Form.Label> Przepisane leki: </Form.Label>{" "}
                </Col>
                <Col sm={11}>
                  <FormControl
                    onChange={this.onChangePrescribedMedicines}
                    defaultValue={this.state.prescribedMedicines}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  {" "}
                  <Form.Label> Imię i nazwisko pacjenta: </Form.Label>{" "}
                </Col>
                <Col sm={12}>
                  <FormControl defaultValue={this.state.patientName} readOnly />
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  {" "}
                  <Form.Label> Imię i nazwisko lekarza: </Form.Label>{" "}
                </Col>
                <Col sm={12}>
                  <FormControl defaultValue={this.state.doctorName} readOnly />
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
                    onClick={this.updateRecipe}
                    className="btn btn-primary"
                    type="submit"
                  >
                    Edytuj receptę
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

export default UpdateRecipeComponent;
