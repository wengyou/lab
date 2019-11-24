import React, {useEffect, useRef, useState} from "react";
import { connect } from "react-redux";
import "../static/style/learningDatas.scss";
import SearchInput from "./Search";
import { Table } from 'antd';
import * as resource from "../redux/actionCreators/softwareResource";

const SoftwareData = props => {
    const {total, softwareResource, handleFetchSoftwareRes} = props;
    useEffect(() => {
        handleFetchSoftwareRes({page: 1, type: "software", resourceName: null, userName: null});
    },[]);
    let softwareRes = softwareResource;
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
            title: '上传人',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '上传时间',
            key: 'addTime',
            dataIndex: 'addTime',
        },
        {
            title: '软件下载',
            key: '软件下载',
            dataIndex: '软件下载',
            render: text => <a src="">下载</a>,
        },
    ];

    return(
        <div className="dataWrapper">
            <SearchInput/>
            <Table
                columns={columns}
                dataSource={softwareRes}
                pagination={{
                    total,
                    pageSize: 10,
                    defaultCurrent: 1,
                    onChange: e => handleFetchSoftwareRes({page: e, type: "software", resourceName: null, userName: null})
                }}
            />
        </div>
    )
};

export default connect(
    state => ({
        total: state.getIn(["resource","total"]),
        softwareResource: state.getIn(["resource","softwareResource"])
    }),
    dispatch => ({
        handleFetchSoftwareRes(args) {
            dispatch(resource.fetchSoftwareResource(args));
        }
    })
)(SoftwareData);