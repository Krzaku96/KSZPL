import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../constants";
import UpdateUserComponent from "../components/UpdateUserComponent";

class UpdateUserContainer extends Component {
  state = {
    password: ""
  };

  redirectToSuccessAdd = () => {
    return this.props.history.push({
      pathname: "/successAddUser"
    });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  updateUserOnClick = event => {
    event.preventDefault();
    console.log("lol");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };

    const postData = {
      firstName: JSON.parse(localStorage.getItem("firstName")),
      lastName: JSON.parse(localStorage.getItem("lastName")),
      username: JSON.parse(localStorage.getItem("username")),
      password: this.state.password,
      role: JSON.parse(localStorage.getItem("role")),
      token: JSON.parse(localStorage.getItem("token"))
    };

    axios.put(BASE_URL + "Users", postData, axiosConfig).then(response => {
      if (response) {
        this.redirectToSuccessAdd();
      } else {
        console.log("Can't find response");
      }
    });
  };

  render() {
    return (
      <UpdateUserComponent
        updateUserOnClick={this.updateUserOnClick}
        handlePasswordChange={this.handlePasswordChange}
      />
    );
  }
}

export default withRouter(UpdateUserContainer);
