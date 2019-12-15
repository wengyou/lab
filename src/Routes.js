import React from "react";
import {Switch, Route} from "react-router-dom";
import Administrator from "./pages/Administrator";
import Users from "./pages/Users";

export default function () {
    return (
        <Switch>
            <Route path="/" component={Users} exact/>
            <Route path="/admin" component={Administrator} exact/>
        </Switch>
    )
}
