import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Table } from 'antd';
import UpLoad from "./UpLoad";
import * as resource from "../redux/actionCreators/resource";
import "../static/style/learningDatas.scss";

const MyData = props => {
    const {
        handleMyData,
        userName,
        total,
        teacherData,
        handleDeleteData,
        userId,
        resourceTemp,
        time,
    }= props;
    useEffect(() => {
        handleMyData({page:1, type:"material", userName: userName})
    },[resourceTemp, time]);

    const columns = [
        {
            title: '资料名',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '大小',
            dataIndex: 'size',
            align: 'center',
            key: 'size',
        },
        {
            title: '上传时间',
            key: 'addTime',
            align: 'center',
            dataIndex: 'addTime',
        },
        {
            title: '资料处理',
            key: '资料处理',
            align: 'center',
            dataIndex: '资料处理',
            render: (text,data) => (
                <a
                    onClick={
                        () => {
                            handleDeleteData({
                                resourceId: data.id,
                                type: "material",
                                userId: userId,
                                userName: userName
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
                <p style={{color: '#FF0000'}}>请及时清理过期的，无用的资料，以节约空间</p>
                <UpLoad/>
                <Table
                    rowKey={record => record.id}
                    size={'small'}
                    columns={columns}
                    dataSource={[...teacherData]}
                    pagination={{
                        total,
                        pageSize: 10,
                        defaultCurrent: 1,
                        onChange: e => {
                            handleMyData({
                                page: e,
                                type: 'material',
                                userName: userName
                            })
                        }
                    }}
                />
            </div>
        </>
    )
};

export default connect(
    state => ({
        userName: state.getIn(["userMana", "common", "name"]),
        teacherData: state.getIn(["resource", "resource", "teacherData"]),
        total: state.getIn(["resource", "resource", "myLearningTotal"]),
        userId: state.getIn(["userMana", "common", "userId"]),
        resourceTemp: state.getIn(["resource", "resource", "resourceTemp"]),
        time: state.getIn(["resource", "resource", "time"]),
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
