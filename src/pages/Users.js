import React from "react";
import {connect} from "react-redux";
import {Tabs} from "antd";
import Home from "./Home";
import Tasks from "./Tasks";
import LearningData from "./LearningData";
import Software from "./Software";
import TeacherData from "./teacherData";
import TeacherSoftware from "./TeacherSoftware";
import {changeType} from "../redux/actionCreators/resource";
const { TabPane } = Tabs;

const User = props => {
    const { history, userIdentify, changeType, openKey} = props;

    return (
        <>
            {
                userIdentify !== "超级管理员" ?
                    <Tabs
                        defaultActiveKey={openKey}
                        style={{width: "64rem", margin:"0 auto", minHeight: "32rem"}}
                        onChange={
                            e => {
                                changeType(e);
                                sessionStorage.setItem("bigOpenKey", e);
                            }
                        }
                    >
                        <TabPane tab={"实验室首页"} key={1}>
                            <Home/>
                        </TabPane>
                        <TabPane tab={"上机任务"} key={2}>
                            <Tasks/>
                        </TabPane>
                        <TabPane tab={"学习资料"} key={3}>
                            {
                                userIdentify === "教师" ? <TeacherData/>: <LearningData/>
                            }
                        </TabPane>
                        <TabPane tab={"软件下载"} key={4}>
                            {
                                userIdentify === "教师" ? <TeacherSoftware/>: <Software/>
                            }
                        </TabPane>
                    </Tabs>
                    :
                    history.push('/admin')
            }
        </>
    )
};

export default connect(
    state => ({
        userIdentify: state.getIn(["userMana","common","userIdentify"]),
        openKey: state.getIn(["userMana", "common", "bigOpenKey"])
    }),
    dispatch => ({
        changeType(key) {
            dispatch(changeType(key))
        }
    })
)(User)