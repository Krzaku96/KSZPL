import axios from "axios";
import moment from "moment";
import React, { Component } from "react";
import { Button, Col, Form, Row, Card } from "react-bootstrap";

import { BASE_URL } from "../../constants";

class ShowRecipeComponent extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      dateRelease: new Date(),
      doctorName: "",
      prescribedMedicines: ""
    };
  }

  componentDidMount() {
    axios
      .get(BASE_URL + `recipe/getrecipe/${this.props.match.params.id}`)
      .then(response => {
        debugger;
        this.setState({
          id: response.data.id,
          dateRelease: response.data.dateRelease,
          doctorName: response.data.doctorName,
          prescribedMedicines: response.data.prescribedMedicines
        });
      })
      .catch(function(error) {});
  }

  parseDate(date) {
    return moment(date).format("DD-MM-YYYY");
  }

  OnClickReturn = () => {
    window.location = `/visit/${this.props.match.params.id}`;
  };

  OnClickEdit = id => {
    window.location = "/recipe/update/" + id;
  };

  onClickGeneratePdf = () => {
    axios
      .get(BASE_URL + `recipe/generaterecipepdf/${this.props.match.params.id}`)
      .then(() => {
        window.confirm("Wygenerowana została recepta w formacie PDF!");
      })
      .catch(err => {});
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
              <Col sm={12}>
                <Form.Label className="labelVisit">
                  {" "}
                  <b> Informacje o recepcie </b>{" "}
                </Form.Label>
              </Col>
              <Row>
                <Col sm={5}>
                  {" "}
                  <Form.Label>
                    {" "}
                    <b> Termin realizacji:</b>{" "}
                  </Form.Label>{" "}
                </Col>
                <Col sm={7}>
                  {" "}
                  <Form.Label>
                    {" "}
                    {this.parseDate(this.state.dateRelease)}{" "}
                  </Form.Label>{" "}
                </Col>
              </Row>
              <Row>
                <Col sm={5}>
                  {" "}
                  <Form.Label>
                    <b> Doktor wystawiający:</b>{" "}
                  </Form.Label>{" "}
                </Col>
                <Col sm={7}>
                  {" "}
                  <Form.Label> {this.state.doctorName} </Form.Label>{" "}
                </Col>
              </Row>
              <Row>
                <Col sm={5}>
                  {" "}
                  <Form.Label>
                    {" "}
                    <b>Przepisane leki:</b>{" "}
                  </Form.Label>{" "}
                </Col>
                <Col sm={7}>
                  {" "}
                  <Form.Label>
                    {" "}
                    {this.state.prescribedMedicines}{" "}
                  </Form.Label>{" "}
                </Col>
              </Row>
              <Row>
                <Col sm={3}>
                  {" "}
                  <Button
                    onClick={() => this.OnClickReturn()}
                    className="btn btn-light"
                  >
                    Wroc
                  </Button>{" "}
                </Col>
                <Col sm={3}>
                  {" "}
                  <Button
                    onClick={() => this.OnClickEdit(this.state.id)}
                    className="btn btn-primary"
                  >
                    Edytuj
                  </Button>{" "}
                </Col>
                <Col sm={6}>
                  {" "}
                  <Button
                    onClick={() => this.onClickGeneratePdf(this.state.id)}
                    className="btn btn-primary"
                  >
                    Generuj pdf
                  </Button>{" "}
                </Col>
              </Row>
            </Form>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default ShowRecipeComponent;
