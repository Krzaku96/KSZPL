import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import axios from "axios";
import { BASE_URL } from "../constants";

class LoginContainer extends Component {
  state = {
    username: "",
    password: "",
    isLogged: false,
    user: []
  };

  saveDataToLocalStorage = () => {
    console.log("lol");
    localStorage.setItem("token", JSON.stringify(this.state.user.token));
  };

  redirectToHome = () => {
    this.saveDataToLocalStorage();
    window.location.reload();
    return this.props.history.push({
      pathname: "/",
      state: {
        user: this.state.user,
        isLogged: this.state.isLogged
      }
    });
  };

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleLoginSubmit = event => {
    event.preventDefault();
    console.log("handle");

    const postData = {
      username: this.state.username,
      password: this.state.password
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };

    axios
      .post(BASE_URL + "Users/authenticate", postData, axiosConfig)
      .then(response => {
        if (response.data) {
          this.setState({ user: response.data, isLogged: true });
          this.redirectToHome();
          console.log(response);
        } else {
          console.log("Can't find response");
        }
      });
  };

  render() {
    return (
      <LoginComponent
        handleLoginSubmit={this.handleLoginSubmit}
        handlePasswordChange={this.handlePasswordChange}
        handleUsernameChange={this.handleUsernameChange}
      />
    );
  }
}

export default withRouter(LoginContainer);
