import React, { Component } from "react";
import AppBarComponent from "../components/AppBarComponent";

class AppBarContainer extends Component {
  redirectToHome = () => {
    this.context.router.history.push("/");
  };

  render() {
    return <AppBarComponent redirectToHome={this.redirectToHome}/>;
  }
}

export default AppBarContainer;
