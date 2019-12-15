import React, {useEffect, useRef, useState} from "react";
import { connect } from "react-redux";
import "../static/style/learningDatas.scss";
import SearchInput from "../components/Search";
import { Table } from 'antd';
import * as resource from "../redux/actionCreators/resource";

const LearningData = props => {
    const {
        resourceName,
        userName,
        type,
        total,
        studyResource,
        handleFetchStudyRes,
        handleSearchValue,
        searchFlag,
    } = props;
    useEffect(() => {
        handleFetchStudyRes({page: 1, type: "material", resourceName: null, userName: null})
    },[]);
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
            key: 'url',
            dataIndex: 'url',
            render: (text) => (
                <a
                    download={{text}.text}
                    href={{text}.text}
                >
                    下载
                </a>
            )
        },
    ];
    return(
       <>
           <div className="dataWrapper">
               <SearchInput/>
               <Table
                   rowKey={record => record.id}
                   columns={columns}
                   dataSource={studyResource}
                   pagination={{
                       total,
                       pageSize: 10,
                       defaultCurrent: 1,
                       onChange: e => {
                           !searchFlag ?
                               handleFetchStudyRes({
                                   page: e,
                                   type: "material",
                                   resourceName: null,
                                   userName: null
                               })
                               :
                               handleSearchValue({
                                   page: e,
                                   type,
                                   resourceName,
                                   userName
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
        resourceName: state.getIn(["resource","resource","resourceName"]),
        type: state.getIn(["resource","resource","type"]),
        userName: state.getIn(["resource","resource","userName"]),
        total: state.getIn(["resource","resource","allLearningTotal"]),
        searchFlag: state.getIn(["resource","resource","searchFlag"]),
        studyResource: state.getIn(["resource","resource","studyResource"]),
        learningUrl: state.getIn(["resource","resource","learningUrl"]),
        searchResource: state.getIn(["resource", "searchRes", "searchResource"])
    }),
    dispatch => ({
        handleFetchStudyRes(args) {
            dispatch(resource.fetchStudyResource(args));
        },
        loadResource(args) {
            dispatch(resource.fetchLoadResource(args));
        },
        handleSearchValue(args){
            dispatch(resource.fetchSearchValue(args));
        }
    })
)(LearningData);