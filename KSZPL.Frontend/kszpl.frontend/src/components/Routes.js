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
import CreatePacientContainer from "../containers/CreatePacientContainer";
import ShowPatientsComponent from "./ShowPatientsComponent";
import EditPatientContainer from "../containers/EditPatientContainer";
import UpdateVisitComponent from "./Visit/UpdateVisitComponent";
import ListVisitsComponent from "./Visit/ListVisitsComponent";
import SearchVisitComponent from "./Visit/SearchVisitComponent";
import CreateRecipeComponent from "./Recipe/CreateRecipeComponent";
import ListPatientCardsComponent from "./PatientCard/ListPatientCardsComponent";
import ShowRecipeComponent from "./Recipe/ShowRecipeComponent";
import UpdateRecipeComponent from "./Recipe/UpdateRecipeComponent";
import ShowHistoryTreatment from "./PatientCard/ShowHistoryTreatmentPatientComponent";
import ErrorComponent from "./Errors/ErrorComponent";

class Routes extends Component {
  render() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomeContainer}></Route>
                <Route exact path="/details" component={DetailsComponent}></Route>
                <Route exact path="/visit/createvisit" component={CreateVisitComponent}></Route>
                <Route exact path="/visit/:id" component={ShowVisitComponent}></Route>
                <Route exact path="/visit/update/:id" component={UpdateVisitComponent}></Route>
                <Route exact path="/listvisits" component={ListVisitsComponent}></Route>
                <Route exact path="/searchvisit" component={SearchVisitComponent}></Route>
                <Route exact path="/showUsers" component={ShowUsersComponent}></Route>
                <Route exact path="/createUser" component={CreateUserContainer}></Route>
                <Route exact path="/changePassword" component={UpdateUserContainer}></Route>
                <Route exact path="/successAddUser" component={SuccessAddUserComponent}></Route>
                <Route exact path="/createPatient" component={CreatePacientContainer}></Route>
                <Route exact path="/showPatients" component={ShowPatientsComponent}></Route>
                <Route exact path="/editPatient" component={EditPatientContainer}></Route>
                <Route exact path="/createRecipe/:id" component={CreateRecipeComponent}></Route>
                <Route exact path="/listpatientcards" component={ListPatientCardsComponent}></Route>
                <Route exact path="/recipe/getrecipe/:id" component={ShowRecipeComponent}></Route>
                <Route exact path="/recipe/update/:id" component={UpdateRecipeComponent}></Route>
                <Route exact path="/patientcard/showhistory/:id" component={ShowHistoryTreatment}></Route>
                <Route exact path="/error" component={ErrorComponent}></Route>
            </Switch>
        </div>
    );
  }
}

export default Routes;