import React, { Component } from "react";
import {Switch, Route} from "react-router-dom";
import HomeContainer from "../containers/HomeContainer";
import DetailsComponent from "./DetailsComponent";
import ShowUsersComponent from "./ShowUsersComponent";
import CreateUserContainer from "../containers/CreateUserContainer";
import UpdateUserContainer from "../containers/UpdateUserContainer";
import SuccessAddUserComponent from "./SuccessAddUserComponent";
import CreatePacientContainer from "../containers/CreatePacientContainer";
import ShowPatientsComponent from "./ShowPatientsComponent";
import EditPatientContainer from "../containers/EditPatientContainer";

class Routes extends Component {
  render() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomeContainer}></Route>
                <Route exact path="/details" component={DetailsComponent}></Route>
                <Route exact path="/showUsers" component={ShowUsersComponent}></Route>
                <Route exact path="/createUser" component={CreateUserContainer}></Route>
                <Route exact path="/changePassword" component={UpdateUserContainer}></Route>
                <Route exact path="/successAddUser" component={SuccessAddUserComponent}></Route>
                <Route exact path="/createPatient" component={CreatePacientContainer}></Route>
                <Route exact path="/showPatients" component={ShowPatientsComponent}></Route>
                <Route exact path="/editPatient" component={EditPatientContainer}></Route>
            </Switch>
        </div>
    );
  }
}

export default Routes;