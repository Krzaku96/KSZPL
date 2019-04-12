import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AppBarComponent from "../components/AppBarComponent";

class AppBarContainer extends Component {
  state = {
    username: ""
  };
  redirectToHome = () => {
    this.context.router.history.push("/");
  };

  redirectToDetails = () => {
    this.getDataFromLocalStorage();
    return this.props.history.push({
      pathname: "/details"
    });
  };

  render() {
    return (
      <AppBarComponent
        redirectToHome={this.redirectToHome}
        redirectToDetails={this.redirectToDetails}
        user={this.props.user}
      />
    );
  }
}

export default withRouter(AppBarContainer);
