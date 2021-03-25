import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import "../static/style/learningDatas.scss";
import SearchInput from "../components/Search";
import {withRouter} from "react-router-dom";
import { Table } from 'antd';
import * as resource from "../redux/actionCreators/resource";

const Software = props => {
    const {
        page,
        searchFlag,
        handleSearchValue,
        resourceName,
        userName,
        type,
        total,
        softwareResource,
        handleFetchSoftwareRes,
        handleDownloadSoftware,
        softwareDataTemp,
        history
    } = props;
    useEffect(() => {
        handleFetchSoftwareRes({page: 1, type: "software", resourceName: null, userName: null});
    },[softwareDataTemp]);
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
            title: '软件下载',
            key: 'url',
            align: 'center',
            dataIndex: 'url',
            render: (text, record) => (
                <a
                    download={record.title}
                    href={{text}.text}
                    onClick={
                        () => {
                            handleDownloadSoftware({
                                id: record.id,
                                type: "software"
                            })
                        }
                    }
                >
                    下载
                </a>
            )
        },
    ];
    const [current, setCurrent] = useState(1);
    useEffect(()=>{
        setCurrent(page);
    },[page]);
    // console.log(history)
    // useEffect(() => {

    // }, [history])
    return(
        <div className="dataWrapper">
            <SearchInput data={type}/>
            <Table
                rowKey={e => (e.id)}
                columns={columns}
                dataSource={[...softwareResource]}
                size={'small'}
                pagination={{
                    total,
                    pageSize: 10,
                    current,
                    onChange: e => {
                        !searchFlag ?
                            handleFetchSoftwareRes({
                                page: e,
                                type: "software",
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
    )
};

export default withRouter(connect(
    state => ({
        total: state.getIn(["resource","resource","allSoftwareTotal"]),
        softwareResource: state.getIn(["resource","resource","softwareResource"]),
        resourceName: state.getIn(["resource","resource","resourceName"]),
        type: state.getIn(["resource","resource","type"]),
        userName: state.getIn(["resource","resource","userName"]),
        searchFlag: state.getIn(["resource","resource","searchFlag"]),
        searchResource: state.getIn(["resource", "searchRes", "searchResource"]),
        page: state.getIn(["resource", "resource", "page"]),
        softwareDataTemp: state.getIn(["resource", "resource", "softwareDataTemp"])
    }),
    dispatch => ({
        handleFetchSoftwareRes(args) {
            dispatch(resource.fetchSoftwareResource(args));
        },
        handleSearchValue(args){
            dispatch(resource.fetchSearchValue(args));
        },
        handleDownloadSoftware(args) {
            dispatch(resource.downloadSoftware(args));
        }
    })
)(Software));
