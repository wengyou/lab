import React, {useEffect} from "react";
import { connect } from "react-redux";
import { Layout, } from "antd";
import { Switch, Route, Redirect } from "react-router-dom";
import LeftNav from "../components/Administrator/LeftNav";
import Header from "../components/Administrator/Header";
import StudentInformation from "../components/Administrator/StudentInformation";
import RegisterUser from "../components/Administrator/RegisterUser";
import LabCourse from "../components/Administrator/LabCourse";
import TeacherCourse from "../components/Administrator/TeacherCourse";
import StudentCourse from "../components/Administrator/StudentCourse";
import StudyInformation from "../components/Administrator/StudyInformation";
import StudySoftware from "../components/Administrator/StudySoftware";
import LabAnnounce from "../components/Administrator/LabAnnounce";
import DataMana from "../components/Administrator/dataMana";
import AdminMessage from "../components/Administrator/AdminMessage";
import TeacherMessage from "../components/Administrator/TeacherMessage";
import {FETCH_PARAM} from "../constants/actionTypes";
const {  Footer, Sider, Content } = Layout;
const Administrator = props =>{
    const {handleParam, userIdentify, history} = props;
    useEffect(() => {
        userIdentify !== '超级管理员' &&  history.push('/user/home');
        handleParam();
    }, [])
    return (
        <>
            <Layout
                style={{width: "100%", minHeight: "100vh"}}
            >
                <Sider width="250px">
                    <LeftNav/>
                </Sider>
                <Layout style={{height: "100%", minHeight: "100vh"}}>
                    <Header/>
                    <Content style={{margin: " 20px", background: "white"}}>
                        <Switch>
                            <Route path = "/admin/userManage/administratorInformation" component = { AdminMessage } />
                            <Route path = "/admin/userManage/teacherInformation" component = { TeacherMessage } />
                            <Route path = "/admin/userManage/studentInformation" component = { StudentInformation } />
                            <Route path = "/admin/userManage/registerUser" component = { RegisterUser } />
                            <Route path = "/admin/courseManage/labCourse" component = { LabCourse } />
                            <Route path = "/admin/courseManage/teacherCourse" component = { TeacherCourse } />
                            <Route path = "/admin/courseManage/studentCourse" component = { StudentCourse } />
                            <Route path = "/admin/informationManage/studyInformation" component = { StudyInformation } />
                            <Route path = "/admin/informationManage/studySoftware" component = { StudySoftware } />
                            <Route path = "/admin/labManage/labAnnounce" component = { LabAnnounce } />
                            <Route path = "/admin/dataInformationManage" component = { DataMana } />
                            <Redirect to = "/admin/userManage/administratorInformation"/>
                        </Switch>
                    </Content>
                    <Footer
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        版权所有 极客网工作室
                    </Footer>
                </Layout>
            </Layout>

        </>
    )
};
export default connect(
    state => ({
        userIdentify: state.getIn(["userMana", "common", "userIdentify"]),
    }),
    dispatch => ({
        handleParam() {
            dispatch({type: FETCH_PARAM})
        }
    })
)(Administrator)
