import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";
import EditUserComponent from "../components/EditUserComponent";

class EditUserContainer extends Component {
  state = {
    firstName: this.props.location.state.firstName,
    lastName: this.props.location.state.lastName,
    username: this.props.location.state.username,
    role: this.props.location.state.role,
    password: ""
  };

  redirectToHome = () => {
    return this.props.history.push({
      pathname: "/"
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

  handleRoleChange = e => {
    this.setState({ role: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  editUserOnClick = event => {
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
      role: this.state.role,
      password: this.state.password
    };

    axios.put(BASE_URL + "Users", postData, axiosConfig).then(response => {
      if (response) {
        window.confirm("Użytkownik został zedytowany!");
        this.redirectToHome();
      } else {
        console.log("Can't find response");
      }
    });
  };

  render() {
    return (
      <EditUserComponent
        editUserOnClick={this.editUserOnClick}
        handleFirstNameChange={this.handleFirstNameChange}
        handleLastNameChange={this.handleLastNameChange}
        handleUsernameChange={this.handleUsernameChange}
        handleRoleChange={this.handleRoleChange}
        handlePasswordChange={this.handlePasswordChange}
        firstName={this.state.firstName}
        lastName={this.state.lastName}
        username={this.state.username}
        role={this.state.role}
      />
    );
  }
}

export default withRouter(EditUserContainer);
