import React, { Component } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Form, FormControl, Col, Row, Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

class CreateRecipeComponent extends Component {
  constructor() {
    super();
    this.state = {
      patientName: "",
      doctorName: "",
      patientCardId: 0,
      userId: 0,
      dateRelease: new Date(),
      prescribedMedicines: "",
      visitId: 0
    };
  }

  componentDidMount() {
    axios
      .get(BASE_URL + `recipe/registerrecipe/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          patientName: response.data.patientName,
          doctorName: response.data.doctorName,
          patientCardId: response.data.patientCardId,
          userId: response.data.doctorId
        });
      });
  }

  redirectToHome = () => {
    return this.props.history.push({
      pathname: "/"
    });
  };

  addRecipe = event => {
    event.preventDefault();
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };
    axios
      .post(
        BASE_URL + "recipe/registerrecipe",
        {
          dateRelease: this.state.dateRelease,
          prescribedMedicines: this.state.prescribedMedicines,
          id: 0,
          patientCardId: this.state.patientCardId,
          userId: this.state.userId,
          visitId: this.props.match.params.id
        },
        axiosConfig
      )
      .then(() => {
        window.confirm("Recepta została dodana!");
        this.redirectToHome();
      })
      .catch(err => {
        console.log(err);
      });
  };

  onChangeDateRelease = dateRelease => this.setState({ dateRelease });

  onChangePrescribedMedicines = event => {
    this.setState({ prescribedMedicines: event.target.value });
  };

  render() {
    return (
      <Card>
        <Card.Header className="color-khaki">
          <Card.Title>Recepta</Card.Title>
        </Card.Header>
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
                    placeholder="Przepisane leki"
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
                    onClick={this.addRecipe}
                    className="btn btn-primary"
                    type="submit"
                  >
                    Dodaj receptę
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

export default withRouter(CreateRecipeComponent);
