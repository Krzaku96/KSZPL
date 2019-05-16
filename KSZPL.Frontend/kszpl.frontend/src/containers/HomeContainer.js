import React, { Component } from "react";
import HomeComponent from "../components/HomeComponent";

class HomeContainer extends Component {
  state = {
    role: ""
  };

  componentWillMount = () => {
    this.checkRole();
  };

  checkRole = () => {
    var role = JSON.parse(localStorage.getItem("role"));
    this.setState({ role: role });
  };

  render() {
    return <HomeComponent role={this.state.role} />;
  }
}

export default HomeContainer;
