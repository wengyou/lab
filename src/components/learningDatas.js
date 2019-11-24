import React, {useEffect, useRef, useState} from "react";
import { connect } from "react-redux";
import "../static/style/learningDatas.scss";
import SearchInput from "./Search";
import { Table } from 'antd';
import * as resource from "../redux/actionCreators/studyResource";
import * as loadRes from "../redux/actionCreators/loadResource";

const LearningData = props => {
    const {learningUrl, total, studyResource, handleFetchStudyRes,loadResource} = props;
    useEffect(() => {
        handleFetchStudyRes({page: 1, type: "material", resourceName: null, userName: null})
    },[]);
    useEffect(() => {
        loadResource({type: "material", resourceName: null})
    },[]);
    let studyRes = studyResource;
    const columns = [
        {
            title: '资料名称',
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
            title: '下载资料',
            key: '下载资料',
            dataIndex: '下载资料',
            render: (text,data) => (<a onClick={
                (e) => {
                    console.log(data);
                    console.log(total);
                    console.log(learningUrl);
                    console.log(e.target);
                    // console.log(e.target.parentNode.parentNode.firstChild.innerHTML);
                    loadResource({type: "material", resourceName: data.title})
                    e.target.href = {learningUrl};
                }
            } >下载</a>),
        },
    ];

    return(
       <div className="dataWrapper">
           <SearchInput/>
           <Table
               columns={columns}
               dataSource={studyRes}
               pagination={{
                   learningUrl,
                   total,
                   pageSize: 10,
                   defaultCurrent: 1,
                   onChange: e => handleFetchStudyRes({page: e, type: "material", resourceName: null, userName: null})
               }}
           />
       </div>
    )
};

export default connect(
    state => ({
        total: state.getIn(["resource","total"]),
        studyResource: state.getIn(["resource","studyResource"]),
        learningUrl: state.getIn(["resource","learningUrl"])
    }),
    dispatch => ({
        handleFetchStudyRes(args) {
            dispatch(resource.fetchStudyResource(args));
        },
        loadResource(args) {
            dispatch(loadRes.fetchLoadResource(args));
        }
    })
)(LearningData);