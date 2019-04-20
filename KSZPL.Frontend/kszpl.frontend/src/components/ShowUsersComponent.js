import React, { Component } from "react";
import UserComponent from "./UserComponent";

class ShowUsersComponent extends Component {
  mapUsersToShow = () => {
    return this.props.location.state.users.map(user => (
      <UserComponent
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
        {this.mapUsersToShow()}
      </div>
    );
  }
}

export default ShowUsersComponent;
