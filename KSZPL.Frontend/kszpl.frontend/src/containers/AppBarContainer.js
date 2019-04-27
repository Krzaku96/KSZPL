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
    return this.props.history.push({
      pathname: "/"
    });
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

  redirectToAddUser = () => {
    return this.props.history.push({
      pathname: "/createUser"
    });
  };
  
  redirectToUpdateUser = () => {
    return this.props.history.push({
      pathname: "/changePassword"
    });
  };

  redirectToListVisits = () => {
    return this.props.history.push({
      pathname: "/listvisits"
    });
  };

  redirectToCreateVisit= () => {
    return this.props.history.push({
      pathname: "/visit/createvisit"
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

    axios.get(BASE_URL + "Users", axiosConfig).then(response => {
      if (response.data) {
        this.setState({ users: response.data });
        this.redirectToShowUsers();
        console.log(response);
      } else {
        console.log("Can't find response");
      }
    });
  };

  logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    return (
      <AppBarComponent
        redirectToHome={this.redirectToHome}
        redirectToDetails={this.redirectToDetails}
        redirectToAddUser={this.redirectToAddUser}
        redirectToUpdateUser={this.redirectToUpdateUser}
        user={this.props.user}
        role={this.state.role}
        showUsersOnClick={this.showUsersOnClick}
        logout={this.logout}
        redirectToListVisits={this.redirectToListVisits}
        redirectToCreateVisit={this.redirectToCreateVisit}
      />
    );
  }
}

export default withRouter(AppBarContainer);
