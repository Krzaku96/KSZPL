import React, { Component } from "react";
import UserComponent from "./UserComponent";
import { Table } from "react-bootstrap";

class ShowUsersComponent extends Component {
  mapUsersToShow = () => {
    return this.props.location.state.users.map((user,id) => (
      <UserComponent
        key={id}
        id={id+1}
        username={user.username}
        firstName={user.firstName}
        lastName={user.lastName}
        role={user.role}
      />
    ));
  };

  render() {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
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
