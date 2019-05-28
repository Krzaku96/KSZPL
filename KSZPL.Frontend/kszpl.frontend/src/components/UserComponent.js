import React, { Component } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../constants";
import { withRouter } from "react-router-dom";

class UserComponent extends Component {
  redirectToUpdateUser = () => {
    return this.props.history.push({
      pathname: "/editUser",
      state: {
        id: this.props.id,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        username: this.props.username,
        role: this.props.role
      }
    });
  };

  deleteUser = event => {
    event.preventDefault();

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "bearer " + JSON.parse(localStorage.getItem("token"))
      }
    };

    axios
      .delete(BASE_URL + "Users/username/" + this.props.username, axiosConfig)
      .then(response => {
        if (response) {
          window.confirm("Usunieto użytkownika");
          window.location = '/showusers'
        } else {
          console.log("Can't find response");
        }
      });
  };

  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.firstName}</td>
        <td>{this.props.lastName}</td>
        <td>{this.props.username}</td>
        <td>{this.props.role}</td>
        <td>
          <Button variant="primary" onClick={this.redirectToUpdateUser}>
            Edytuj
          </Button>
          <Button variant="danger" onClick={this.deleteUser}>
            Usuń
          </Button>
        </td>
      </tr>
    );
  }
}

export default withRouter(UserComponent);
