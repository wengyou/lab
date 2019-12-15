/*
Tasks是一个集成组件，里面有一个小的tab，小的tab包括myTasks和allTasks
小的tab的显示是在学生登录的时候
游客只能看见allTask
 */
import React from "react";
import {Tabs, Card} from "antd";
import AllTasks from "../components/AllTasks";
import StudentTasks from "../components/StudentTasks";
import AllCourse from "../components/AllCourse";
import { connect } from "react-redux";
import TeacherTasks from "../components/TeacherTasks";
const {TabPane} = Tabs;
const Tasks = props => {
    const { userIdentify, openKey } = props;
    return (
            <Card
                style={{margin:"0 auto"}}
                >
                    <Tabs
                        defaultActiveKey={openKey}

                        onChange={(activeKey) =>{
                            sessionStorage.setItem("smallOpenKey", activeKey)
                        }
                        }
                    >
                        {
                            userIdentify !== "游客" ?
                                <TabPane tab={"我的任务"} key={1}>
                                    {
                                        userIdentify === "教师" ?
                                            <TeacherTasks/> :
                                            <StudentTasks/>
                                    }
                                </TabPane> :
                                null
                        }
                        {
                            userIdentify === "教师" ?
                                <TabPane tab={"实验课程"} key={2}>
                                    <AllCourse/>
                                </TabPane> :
                                null
                        }
                        <TabPane tab={"所有任务"} key = {3} >
                            <AllTasks/>
                        </TabPane>
                    </Tabs>
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