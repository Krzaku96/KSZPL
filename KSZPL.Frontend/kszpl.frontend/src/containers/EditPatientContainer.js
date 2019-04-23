import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";
import EditPacientComponent from "../components/EditPacientComponent";

class EditPatientContainer extends Component {
  state = {
    id: this.props.location.state.id,
    firstName: this.props.location.state.firstName,
    lastName: this.props.location.state.lastName,
    email: this.props.location.state.email,
    address: this.props.location.state.address,
    nip: this.props.location.state.nip,
    pesel: this.props.location.state.pesel,
    dateBirth: this.props.location.state.dateBirth,
    dateRegister: this.props.location.state.dateOfRegister
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
    this.setState({ dateBirth: e.target.value });
  };

  editPatientOnClick = event => {
    event.preventDefault();

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };

    const postData = {
      id: this.state.id,
      name: this.state.firstName,
      surname: this.state.lastName,
      email: this.state.email,
      address: this.state.address,
      nip: this.state.nip,
      dateBirth: this.state.dateBirth,
      dateRegister: this.state.dateRegister
    };

    axios.put(BASE_URL + "Patient", postData, axiosConfig).then(response => {
      if (response) {
        this.redirectToSuccessAdd();
      } else {
        console.log("Can't find response");
      }
    });
  };

  render() {
    return (
      <EditPacientComponent
        editPatientOnClick={this.editPatientOnClick}
        handleFirstNameChange={this.handleFirstNameChange}
        handleLastNameChange={this.handleLastNameChange}
        handleAddressChange={this.handleAddressChange}
        handleDateOfBirthChange={this.handleDateOfBirthChange}
        handleEmailChange={this.handleEmailChange}
        handleNIPChange={this.handleNIPChange}
        handlePeselChange={this.handlePeselChange}
        firstName={this.state.firstName}
        lastName={this.state.lastName}
        dateBirth={this.state.dateBirth}
        pesel={this.state.pesel}
        address={this.state.address}
        nip={this.state.nip}
        dateRegister={this.state.dateRegister}
        email={this.state.email}
      />
    );
  }
}

export default withRouter(EditPatientContainer);
