/*
Tasks是一个集成组件，里面有一个小的tab，小的tab包括myTasks和allTasks
小的tab的显示是在学生登录的时候
游客只能看见allTask
 */
import React, {useEffect} from "react";
import { Card } from "antd";
import AllTasks from "../components/AllTasks";
import StudentTasks from "../components/StudentTasks";
import { connect } from "react-redux";
import TeacherTasks from "../components/TeacherTasks";
import Nav from "../components/nav";
import {Switch, Route} from 'react-router-dom';
const Tasks = props => {
    const { userIdentify } = props;

    useEffect(() => {
        props.history.location.pathname === '/user/task' && props.history.push('/user/task/mytask')
    }, [props.history.location.pathname]);

    const tabList = [
        {name: '我的任务', path: '/user/task/mytask'},
        {name: '所有任务', path: '/user/task/alltask'}
        ]

    return (
            <Card
                style={{margin:"0 auto"}}
                >
                <Nav tabList={tabList} location={props.history.location.pathname} />
                <Switch>
                    <Route path="/user/task/mytask" component={userIdentify === '教师' ? TeacherTasks : StudentTasks } />
                    <Route path="/user/task/alltask" component={AllTasks } />
                </Switch>
            </Card>
    )
};
export default connect(
    state=>({
        userIdentify: state.getIn(["userMana", "common", "userIdentify"]),
        openKey: state.getIn(["userMana", "common", "smallOpenKey"])
    }),
    dispatch=>({

    })
)(Tasks);


// {
//     userIdentify === "教师" ?
//         <TabPane tab = {"实验课程"} key = {2}>
//             <AllCourse/>
//         </TabPane> :
//         null
// }
