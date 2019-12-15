import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Table } from 'antd';
import UpLoad from "./UpLoad";
import * as resource from "../redux/actionCreators/resource";
import "../static/style/learningDatas.scss";

const MyData = props => {
    const {
        handleMyData,
        userId,
        total,
        teacherData,
        handleDeleteData,
        resourceId,
        type
    }= props;
    console.log(userId);
    useEffect(() => {
        handleMyData({page:1, type:"material", userName: userId})
    },[]);
    useEffect(() => {
        handleDeleteData({resourceId, type, userId})
    }, []);
    const columns = [
        {
            title: '资料名',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '大小',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: '上传时间',
            key: 'addTime',
            dataIndex: 'addTime',
        },
        {
            title: '资料处理',
            key: '资料处理',
            dataIndex: '资料处理',
            render: (text,data) => (
                <a
                    onClick={
                        () => {
                            handleDeleteData({
                                resourceId: data.id,
                                type: "material",
                                userId: data.userName
                            });
                            console.log(data.id)
                        }
                    }
                    className="resDelete">
                    删除
                </a>
            )
        },
    ];

    return(
        <>
            <div className="dataWrapper">
                <UpLoad/>
                <Table
                    rowKey={record => record.id}
                    columns={columns}
                    dataSource={teacherData}
                    pagination={{
                        total,
                        pageSize: 10,
                        defaultCurrent: 1,
                        onChange: e => {
                            handleMyData({
                                page: e,
                                type: 'material',
                                userName: userId
                            })
                        }
                    }}
                />
            </div>
            <style>
                {
                    `
                        .ant-table-content {
                            border: 1px dashed #efefef !important;
                        }
                   `
                }
            </style>
        </>
    )
};

export default connect(
    state => ({
        userId: state.getIn(["userMana", "common", "name"]),
        teacherData: state.getIn(["resource", "resource", "teacherData"]),
        total: state.getIn(["resource", "resource", "myLearningTotal"])
    }),
    dispatch => ({
        handleMyData(args){
            dispatch(resource.fetchTeacherData(args));
        },
        handleDeleteData(args){
            dispatch(resource.deleteData(args))
        }
    })
)(MyData);