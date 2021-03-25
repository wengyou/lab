import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Administrator from "./pages/Administrator";
import Users from "./pages/Users";


export default function () {
    return (
        <Switch>
            <Route path="/user" component={Users}/>
            <Route path="/admin" component={Administrator}/>
            <Redirect from='*' to='/user/home' />
        </Switch>
    )
}
