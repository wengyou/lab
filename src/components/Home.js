import React from "react";
import {Table, Card, Carousel} from "antd";
import "../static/style/home.scss";
import  img1 from "../static/images/1.jpg"
import  img2 from "../static/images/2.jpg"
import  img3 from "../static/images/3.jpg"
import  img4 from "../static/images/4.jpg"
//首页的轮播图和公告
const Home = () => {
    const dataSource = [
            {
                key: 1,
                tit: 'hhahhah',
                time: '12345'
            },
            {
                key: 2,
                tit: 'fghjkah',
                time: '876543'
            },
            {
                key: 3,
                tit: 'hhahhah',
                time: '12345'
            },
            {
                key: 4,
                tit: 'fghjkah',
                time: '876543'
            },

        ]

    ,
        columns = [
            {
                title: '公告标题',
                dataIndex: 'tit',
                key: 'tit',
            },
            {
                title: '发布时间',
                width: '30%',
                dataIndex: 'time',
                key: 'time',
            }];
    return (
        <div className="wrap">
        <div className = "homeWrap">
            <div className = "homeLeft">
                <Card style={{minHeight:'460px'}}>
                    <Table
                        dataSource = {dataSource}
                        columns = {columns}
                        bordered = {true}
                    />
                </Card>
            </div>
            <div className = "homeRight">
                <Carousel autoplay>
                    <img src={img1}/>
                    <img src={img2}/>
                    <img src={img3}/>
                    <img src={img4}/>
                </Carousel>
            </div>
        </div>
        </div>
    )
};

export default Home;