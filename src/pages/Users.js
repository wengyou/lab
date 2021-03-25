import React from "react";
import {connect} from "react-redux";
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from "./Home";
import Tasks from "./Task";
import LearningData from "./LearningData";
import Software from "./Software";
import TeacherData from "./teacherData";
import TeacherSoftware from "./TeacherSoftware";
import {changeType} from "../redux/actionCreators/resource";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BackTop } from "antd";
import Nav from "../components/nav";
import AllTasks from "./Task/allTasks";

const User = props => {
    const { userIdentify} = props;

    const tabList = [
        {name: '实验室首页', path: '/user/home'},
        {name: '实验任务', path: '/user/task'},
        {name: '学习资料', path: '/user/resource'},
        {name: '软件下载', path: '/user/download'}
    ]

    return (
        <div>
            <Header/>
            <div className="margin_0_auto" style={{width: '64rem'}}>
                <div style={{width: '64rem'}}>
                    <Nav tabList={tabList} location={props.history.location.pathname.length > 14 ? props.history.location.pathname.substr(0,props.history.location.pathname.lastIndexOf('/')) : props.history.location.pathname}/>
                </div>
                <div style={{
                    padding: '10px 5px',
                    width: '1024px',
                    border: '1px solid #e8e8e8',
                    minHeight: '500px'
                }}>
                    <Switch>
                        <Route path="/user/home" component={Home}/>
                        <Route path="/user/task" component={(userIdentify === '教师' || userIdentify === '学生') ? Tasks : AllTasks}/>
                        <Route path="/user/resource" component={userIdentify === "教师" ? TeacherData : LearningData}/>
                        <Route path="/user/download" component={userIdentify === "教师" ? TeacherSoftware : Software}/>
                        <Redirect from='*' to='/user/home' />
                    </Switch>
                </div>
                <Footer/>
            </div>
            <BackTop />
        </div>
    )
};

export default connect(
    state => ({
        userIdentify: state.getIn(["userMana","common","userIdentify"]),
        openKey: state.getIn(["userMana", "common", "bigOpenKey"]),
        time: state.getIn(["userMana", "common", "time"])
    }),
    dispatch => ({
        changeType(key) {
            dispatch(changeType(key))
        }
    })
)(User)

// {
//     userIdentify !== "超级管理员" ?
//         <Tabs
//             key={time}
//             defaultActiveKey={openKey}
//             style={{width: "64rem", margin:"0 auto", minHeight: "32rem"}}
//             onChange={() => {}}
//         >
//             <TabPane tab={"实验室首页"} key={1}>
//                 <Home/>
//             </TabPane>
//             <TabPane tab={"实验任务"} key={2}>
//                 <Tasks/>
//             </TabPane>
//             <TabPane tab={"学习资料"} key={3}>
//                 {
//                     userIdentify === "教师" ? <TeacherData/>: <LearningData/>
//                 }
//             </TabPane>
//             <TabPane tab={"软件下载"} key={4}>
//                 {
//                     userIdentify === "教师" ? <TeacherSoftware/>: <Software/>
//                 }
//             </TabPane>
//         </Tabs>
//         :
//         history.push('/admin')
// }
