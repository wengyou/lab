import React, {useEffect, useState} from "react";
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
        handleDownload,
        searchFlag,
        page,
        learningDataTemp,
        time,
    } = props;
    useEffect(() => {
        handleFetchStudyRes({page: 1, type: "material", resourceName: null, userName: null})
    },[learningDataTemp, time]);

    const [current, setCurrent] = useState(1);
    useEffect(()=>{
        setCurrent(page);
    },[page]);


    const columns = [
        {
            title: '资料名称',
            dataIndex: 'title',
            key: 'title',
            // width: '400px'
        },
        {
            title: '大小',
            dataIndex: 'size',
            align: 'center',
            key: 'size',
        },
        {
            title: '上传人',
            dataIndex: 'userName',
            align: 'center',
            key: 'userName',
        },
        {
            title: '上传时间',
            key: 'addTime',
            align: 'center',
            dataIndex: 'addTime',
        },
        {
            title: '下载次数',
            key: 'num',
            align: 'center',
            dataIndex: 'downloadNum',
        },
        {
            title: '下载资料',
            key: 'url',
            align: 'center',
            dataIndex: 'url',
            render: (text, record) => (
                <a
                    download={record.title}
                    href={{text}.text}
                    onClick={
                        () => {
                            handleDownload({
                                id: record.id,
                                type: "material"
                            })
                        }
                    }
                >
                    下载
                </a>
            )
        },
    ];
    return(
       <>
           <div className="dataWrapper">
               <SearchInput data={type}/>
               <Table
                   tableLayout={"fixed"}
                   size={'small'}
                   rowKey={record => record.id}
                   columns={columns}
                   dataSource={[...studyResource]}
                   pagination={{
                       total,
                       pageSize: 10,
                       current,
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
                               });
                       }
                   }}
               />
           </div>
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
        searchResource: state.getIn(["resource", "searchRes", "searchResource"]),
        page: state.getIn(["resource", "resource", "page"]),
        learningDataTemp: state.getIn(["resource", "resource", "learningDataTemp"]),
        time: state.getIn(["resource", "resource","time"]),
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
        },
        handleDownload(args) {
            dispatch(resource.downloadResource(args));
        }
    })
)(LearningData);
