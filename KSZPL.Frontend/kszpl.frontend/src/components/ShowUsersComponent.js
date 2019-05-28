import React, { Component } from "react";
import UserComponent from "./UserComponent";
import { Table } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../constants";

class ShowUsersComponent extends Component {
  state = {
    users: []
  };

  mapUsersToShow = () => {
    return this.state.users.map((user, id) => (
      <UserComponent
        key={id}
        id={id + 1}
        username={user.username}
        firstName={user.firstName}
        lastName={user.lastName}
        role={user.role}
      />
    ));
  };

  componentDidMount = () => {
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "bearer " + JSON.parse(localStorage.getItem("token"))
      }
    };

    axios
      .get(BASE_URL + "Users", axiosConfig)
      .then(response => {
        if (response.data) {
          this.setState({ users: response.data });
          console.log(response);
        } else {
          console.log("Can't find response");
        }
      })
      .catch(error => {
        this.setState({ errorCode: error.response.status });
        this.handleError();
      });
  };

  render() {
    return (
      <div>
        <Table striped bordered hover >
          <thead className="color-khaki color-black">
            <tr>
              <th>#</th>
              <th>Imię</th>
              <th>Nazwisko</th>
              <th>Login</th>
              <th>Rola</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>{this.mapUsersToShow()}</tbody>
        </Table>
      </div>
    );
  }
}

export default ShowUsersComponent;
