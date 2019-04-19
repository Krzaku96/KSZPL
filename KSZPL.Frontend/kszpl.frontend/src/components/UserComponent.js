import React, { Component } from "react";

class UserComponent extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.username}</td>
        <td>{this.props.firstName}</td>
        <td>{this.props.lastName}</td>
        <td>{this.props.role}</td>
        <td></td>
      </tr>
    );
  }
}

export default UserComponent;
