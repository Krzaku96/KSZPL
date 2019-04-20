import React, { Component } from "react";
import {Switch, Route} from "react-router-dom";
import HomeContainer from "../containers/HomeContainer";
import DetailsComponent from "./DetailsComponent";
import CreateVisitComponent from "./Visit/CreateVisitComponent";
import ShowVisitComponent from "./Visit/ShowVisitComponent";
import ShowUsersComponent from "./ShowUsersComponent";
import CreateUserContainer from "../containers/CreateUserContainer";
import UpdateUserContainer from "../containers/UpdateUserContainer";
import SuccessAddUserComponent from "./SuccessAddUserComponent";

class Routes extends Component {
  render() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomeContainer}></Route>
                <Route exact path="/details" component={DetailsComponent}></Route>
                <Route exact path="/visit/createvisit" component={CreateVisitComponent}></Route>
                <Route exact path="/visit/:id" component={ShowVisitComponent}></Route>
                <Route exact path="/showUsers" component={ShowUsersComponent}></Route>
                <Route exact path="/createUser" component={CreateUserContainer}></Route>
                <Route exact path="/changePassword" component={UpdateUserContainer}></Route>
                <Route exact path="/successAddUser" component={SuccessAddUserComponent}></Route>
            </Switch>
        </div>
    );
  }
}

export default Routes;