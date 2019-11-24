import React from "react";
import {Switch, Route} from "react-router-dom";
import Home from "./components/Home";
import LearningData from "./components/learningDatas";
import SoftwareData from "./components/software";

export default function () {
    return (
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/learningData" component={LearningData} exact/>
            <Route path="/softwareData" component={SoftwareData} exact/>
        </Switch>
    )
}
