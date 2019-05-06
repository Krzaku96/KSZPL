import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";
import CreatePacientComponent from "../components/CreatePacientComponent";
import moment from "moment";

class CreatePacientContainer extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    nip: null,
    pesel: "",
    dateOfBirth: "",
    dateOfRegister: "",
    doctors: [],
    doctor: ""
  };

  componentDidMount = () => {
    axios.get(BASE_URL + "users/getDoctors").then(response => {
      this.setState({
        doctors: response.data
      });
    });
  };

  redirectToSuccessAdd = () => {
    return this.props.history.push({
      pathname: "/successAddUser"
    });
  };

  handleFirstNameChange = e => {
    this.setState({ firstName: e.target.value });
  };

  handleLastNameChange = e => {
    this.setState({ lastName: e.target.value });
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handleNIPChange = e => {
    this.setState({ nip: e.target.value });
  };

  handlePeselChange = e => {
    this.setState({ pesel: e.target.value });
  };

  handleAddressChange = e => {
    this.setState({ address: e.target.value });
  };

  handleDateOfBirthChange = e => {
    this.setState({ dateOfBirth: e.target.value });
  };

  handleDoctorChange = e => {
    this.setState({ doctor: e.target.value });
  };

  createOptionsDoctors = () => {
    return this.state.doctors.map(doctors => (
      <option value={doctors.id} key={doctors.id}>
        {doctors.firstName} {doctors.lastName}
      </option>
    ));
  };

  addPatientOnClick = event => {
    event.preventDefault();

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };

    this.setState({ dateOfRegister: moment().format("YYYY-MM-DD") });

    const postData = {
      name: this.state.firstName,
      surname: this.state.lastName,
      email: this.state.email,
      address: this.state.address,
      nip: this.state.nip,
      dateBirth: this.state.dateOfBirth,
      dateRegister: this.state.dateOfRegister,
      pesel: this.state.pesel,
      doctor: this.state.doctor
    };

    axios
      .post(BASE_URL + "Patient/registerpatient", postData, axiosConfig)
      .then(response => {
        if (response) {
          this.redirectToSuccessAdd();
        } else {
          console.log("Can't find response");
        }
      });
  };

  render() {
    return (
      <CreatePacientComponent
        addPatientOnClick={this.addPatientOnClick}
        handleFirstNameChange={this.handleFirstNameChange}
        handleLastNameChange={this.handleLastNameChange}
        handleAddressChange={this.handleAddressChange}
        handleDateOfBirthChange={this.handleDateOfBirthChange}
        handleEmailChange={this.handleEmailChange}
        handleNIPChange={this.handleNIPChange}
        handlePeselChange={this.handlePeselChange}
        handleDoctorChange={this.handleDoctorChange}
        createOptionsDoctors={this.createOptionsDoctors}
      />
    );
  }
}

export default withRouter(CreatePacientContainer);
