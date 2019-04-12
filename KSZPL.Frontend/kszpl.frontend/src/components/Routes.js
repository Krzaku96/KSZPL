import React, { Component } from "react";
import {Switch, Route} from "react-router-dom";
import HomeContainer from "../containers/HomeContainer";
import DetailsComponent from "./DetailsComponent";

class Routes extends Component {
  render() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomeContainer}></Route>
                <Route exact path="/details" component={DetailsComponent}></Route>
            </Switch>
        </div>
    );
  }
}

export default Routes;