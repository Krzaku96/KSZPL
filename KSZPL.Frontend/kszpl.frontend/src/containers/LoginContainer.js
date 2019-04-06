import React, { Component } from "react";
import LoginComponent from "../components/LoginComponent";
import axios from "axios";
import { BASE_URL } from "../constants";

class LoginContainer extends Component {
  state = {
    username: "",
    password: "",
    isLogged: false
  };

  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
  };

  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };

  handleLoginSubmit = () => {
    const postData = {
      username: this.state.username,
      password: this.state.password
    };

    axios.post(BASE_URL + "Users/authenticate", { postData }).then(res => {
      this.setState({ isLogged: true });
      //zapisanie tokena w appSettings
      console.log(res);
      console.log(res.data);
      //przejscie do Home z przekazaniem mu info ze isLogged
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

export default LoginContainer;
