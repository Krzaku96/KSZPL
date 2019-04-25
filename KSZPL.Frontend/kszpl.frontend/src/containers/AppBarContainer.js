import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AppBarComponent from "../components/AppBarComponent";
import axios from "axios";
import { BASE_URL } from "../constants";

class AppBarContainer extends Component {
  state = {
    username: "",
    role: "",
    users: [],
    patients: []
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

  redirectToShowPatients = () => {
    return this.props.history.push({
      pathname: "/showPatients",
      state: {
        patients: this.state.patients
      }
    });
  }

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
  
  redirectToAddPatient = () => {
    return this.props.history.push({
      pathname: "/createPatient"
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

  showPatients = event => {
    event.preventDefault();

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    };

    axios.get(BASE_URL + "Patient", axiosConfig).then(response => {
      if (response.data) {
        this.setState({ patients: response.data });
        console.log(response);
        this.redirectToShowPatients();
      } else {
        console.log("Can't find response");
      }
    });
  }

  logout = () => {
    localStorage.clear();
    this.redirectToHome();
    window.location.reload();
  };

  render() {
    return (
      <AppBarComponent
        redirectToHome={this.redirectToHome}
        redirectToDetails={this.redirectToDetails}
        redirectToAddUser={this.redirectToAddUser}
        redirectToUpdateUser={this.redirectToUpdateUser}
        redirectToAddPatient={this.redirectToAddPatient}
        user={this.props.user}
        role={this.state.role}
        showUsersOnClick={this.showUsersOnClick}
        showPatients={this.showPatients}
        logout={this.logout}
      />
    );
  }
}

export default withRouter(AppBarContainer);
