import React, { Component } from "react";
import {Switch, Route} from "react-router-dom";
import HomeContainer from "../containers/HomeContainer";

class Routes extends Component {
  render() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={HomeContainer}></Route>
            </Switch>
        </div>
    );
  }
}

export default Routes;