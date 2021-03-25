import React, { useEffect } from "react";
import { Card} from "antd";
import LearningData from "./LearningData";
import MyData from "../components/MyData";
import Nav from "../components/nav";
import { Route, Switch} from "react-router-dom";

const TeacherData = (props) => {

    const { pathname } = props.history.location;

    useEffect(() => {
        pathname === '/user/resource' && props.history.push('/user/resource/myresource')
    }, [pathname]);

    const tabList = [
        {name: '我的资料', path: '/user/resource/myresource'},
        {name: '所有资料', path: '/user/resource/allresource'}
    ]

    return (
        <Card
            style={{margin:"0 auto"}}
        >
            <Nav tabList={tabList} location={props.history.location.pathname} />
            <Switch>
                <Route path="/user/resource/myresource" component={MyData} />
                <Route path="/user/resource/allresource" component={LearningData} />
            </Switch>
        </Card>
    )
};
export default TeacherData;
