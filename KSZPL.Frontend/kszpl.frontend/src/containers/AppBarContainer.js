import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AppBarComponent from "../components/AppBarComponent";
import axios from "axios";
import { BASE_URL } from "../constants";

class AppBarContainer extends Component {
  state = {
    username: "",
    role: "",
    users: []
  };

  componentWillMount = () => {
    this.checkRole();
  };

  redirectToHome = () => {
    this.context.router.history.push("/");
  };

  redirectToDetails = () => {
    return this.props.history.push({
      pathname: "/details"
    });
  };

  redirectToShowUsers = () => {
    return this.props.history.push({
      pathname: "/showUsers",
      state: {
        users: this.state.users
      }
    });
  };

  checkRole = () => {
    var role = JSON.parse(localStorage.getItem("role"));
    this.setState({ role: role });
  };

  showUsersOnClick = event => {
    event.preventDefault();

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };

    axios
      .get(BASE_URL + "Users", axiosConfig)
      .then(response => {
        if (response.data) {
          this.setState({ users: response.data});
          this.redirectToShowUsers();
          console.log(response);
        } else {
          console.log("Can't find response");
        }
      });
  };

  addUserOnClick = () => {
    //to do
  }

  render() {
    return (
      <AppBarComponent
        redirectToHome={this.redirectToHome}
        redirectToDetails={this.redirectToDetails}
        user={this.props.user}
        role={this.state.role}
        showUsersOnClick={this.showUsersOnClick}
      />
    );
  }
}

export default withRouter(AppBarContainer);
