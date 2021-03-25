import React, {useEffect} from "react";
import { Card } from "antd";
import Software from "./Software";
import MySoftware from "../components/MySoftware";
import Nav from "../components/nav";
import { Route, Switch} from "react-router-dom";

const TeacherSoftware = (props) => {

    const { pathname } = props.history.location;

    useEffect(() => {
        pathname === '/user/download' && props.history.push('/user/download/mysoftware')
    }, [pathname]);

    const tabList = [
        {name: '我的软件', path: '/user/download/mysoftware'},
        {name: '所有软件', path: '/user/download/allsoftware'}
    ]

    return (
        <Card>
            <Nav tabList={tabList} location={props.history.location.pathname} />
            <Switch>
                <Route path="/user/download/mysoftware" component={MySoftware} />
                <Route path="/user/download/allsoftware" component={Software} />
            </Switch>
        </Card>
    )
};
export default TeacherSoftware;
