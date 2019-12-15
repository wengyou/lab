import React, {useEffect, useRef, useState} from "react";
import { connect } from "react-redux";
import {Tabs, Card} from "antd";
import LearningData from "./LearningData";
import MyData from "../components/MyData";

const {TabPane} = Tabs;
const TeacherData = () => {
    return (
        <Card
            style={{margin:"0 auto"}}
        >
            <Tabs>
                <TabPane tab={"我的资料"} key = "1" >
                    <MyData/>
                </TabPane>
                <TabPane tab={"所有资料"} key = "2" >
                    <LearningData/>
                </TabPane>
            </Tabs>
        </Card>
    )
};
export default TeacherData;