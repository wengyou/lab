import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { Table } from 'antd';
import UpLoad from "./UpLoad";
import * as resource from "../redux/actionCreators/resource";
import "../static/style/learningDatas.scss";

const MySoftware = props => {
    const {
        handleMySoftware,
        userId,
        total,
        teacherSoftware,
        handleDeleteSoftware
    }= props;
    console.log(userId);
    useEffect(() => {
        handleMySoftware({page:1, type:"software", userName: userId})
    },[]);
    const columns = [
        {
            title: '软件名称',
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
            title: '软件处理',
            key: '软件处理',
            dataIndex: '软件处理',
            render: (text,data) => (
                <a
                    onClick={
                        () => {
                            handleDeleteSoftware({
                                resourceId: data.id,
                                type: "software",
                                userId: data.userName
                            });
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
                    dataSource={teacherSoftware}
                    pagination={{
                        total,
                        pageSize: 10,
                        defaultCurrent: 1,
                        onChange: e => {
                            handleMySoftware({
                                page: e,
                                type: 'software',
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
        teacherSoftware: state.getIn(["resource", "resource", "teacherSoftware"]),
        total: state.getIn(["resource", "resource", "mySoftwareTotal"])
    }),
    dispatch => ({
        handleMySoftware(args){
            dispatch(resource.fetchTeacherSoftware(args));
        },
        handleDeleteSoftware(args) {
            dispatch(resource.deleteSoftware(args))
        }
    })
)(MySoftware);