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
    role: ""
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
          this.redirectToSuccessAdd();
        } else {
          console.log("Can't find response");
        }
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
