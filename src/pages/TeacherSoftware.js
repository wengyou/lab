import React, {useEffect, useRef, useState} from "react";
import {Tabs, Card} from "antd";
import Software from "./Software";
import MySoftware from "../components/MySoftware";

const {TabPane} = Tabs;
const TeacherSoftware = () => {
    return (
        <Card
            style={{margin:"0 auto"}}
        >
            <Tabs>
                <TabPane tab={"我的软件"} key = "1" >
                    <MySoftware/>
                </TabPane>
                <TabPane tab={"所有软件"} key = "2" >
                   <Software/>
                </TabPane>
            </Tabs>
        </Card>
    )
};
export default TeacherSoftware;