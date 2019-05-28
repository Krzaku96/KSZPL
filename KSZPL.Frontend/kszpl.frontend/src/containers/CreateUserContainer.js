import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";
import CreateUserComponent from "../components/CreateUserComponent";

class CreateUserContainer extends Component {
  state = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
    errorCode: 0
  };

  redirectToHome = () => {
    return this.props.history.push({
      pathname: "/"
    });
  };

  handleError = () => {
    return this.props.history.push({
      pathname: "/error",
      state: {
        errorCode: this.state.errorCode
      }
    });
  };

  handleFirstNameChange = e => {
    this.setState({ firstName: e.target.value });
  };

  handleLastNameChange = e => {
    this.setState({ lastName: e.target.value });
  };

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleRoleChange = e => {
    this.setState({ role: e.target.value });
  };

  addUserOnClick = event => {
    event.preventDefault();

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "bearer " + JSON.parse(localStorage.getItem("token"))
      }
    };

    const postData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password,
      role: this.state.role,
      token: ""
    };

    axios
      .post(BASE_URL + "Users/register", postData, axiosConfig)
      .then(response => {
        if (response) {
          window.confirm("Użytkownik został dodany!");
          this.redirectToHome();
        } else {
          console.log("Can't find response");
        }
      })
      .catch(error => {
        this.setState({ errorCode: error.response.status });
        this.handleError();
      });
  };

  render() {
    return (
      <CreateUserComponent
        addUserOnClick={this.addUserOnClick}
        handleFirstNameChange={this.handleFirstNameChange}
        handleLastNameChange={this.handleLastNameChange}
        handlePasswordChange={this.handlePasswordChange}
        handleUsernameChange={this.handleUsernameChange}
        handleRoleChange={this.handleRoleChange}
      />
    );
  }
}

export default withRouter(CreateUserContainer);
