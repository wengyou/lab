import React, {useEffect} from "react";
import { connect } from "react-redux";
import { Table } from 'antd';
import UpLoad from "./UpLoad";
import * as resource from "../redux/actionCreators/resource";
import "../static/style/learningDatas.scss";

const MySoftware = props => {
    const {
        handleMySoftware,
        userId,
        userName,
        total,
        teacherSoftware,
        handleDeleteSoftware,
        softwareTemp,
        time,
    }= props;
    useEffect(() => {
        handleMySoftware({page:1, type:"software", userName: userName})
    },[softwareTemp, time]);
    const columns = [
        {
            title: '软件名称',
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
            title: '软件处理',
            key: '软件处理',
            align: 'center',
            dataIndex: '软件处理',
            render: (text,data) => (
                <a
                    onClick={
                        () => {
                            handleDeleteSoftware({
                                resourceId: data.id,
                                type: "software",
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
                <p style={{color: '#FF0000'}}>请及时清理过期的，无用的软件，以节约空间</p>
                <UpLoad/>
                <Table
                    rowKey={record => record.id}
                    size={'small'}
                    columns={columns}
                    dataSource={[...teacherSoftware]}
                    pagination={{
                        total,
                        pageSize: 10,
                        defaultCurrent: 1,
                        onChange: e => {
                            handleMySoftware({
                                page: e,
                                type: 'software',
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
        teacherSoftware: state.getIn(["resource", "resource", "teacherSoftware"]),
        total: state.getIn(["resource", "resource", "mySoftwareTotal"]),
        userId: state.getIn(["userMana", "common", "userId"]),
        softwareTemp: state.getIn(["resource", "resource", "softwareTemp"]),
        time: state.getIn(["resource", "resource", "time"]),
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
