import React, {useEffect} from "react";
import { connect } from "react-redux";
import "../static/style/learningDatas.scss";
import SearchInput from "../components/Search";
import { Table } from 'antd';
import * as resource from "../redux/actionCreators/resource";

const Software = props => {
    const {
        searchFlag,
        handleSearchValue,
        resourceName,
        userName,
        type,
        total,
        softwareResource,
        handleFetchSoftwareRes} = props;
    useEffect(() => {
        handleFetchSoftwareRes({page: 1, type: "software", resourceName: null, userName: null});
    },[]);
    // let softwareRes = softwareResource;
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
        <div className="dataWrapper">
            <SearchInput/>
            <Table
                columns={columns}
                dataSource={softwareResource}
                pagination={{
                    total,
                    pageSize: 10,
                    defaultCurrent: 1,
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

export default connect(
    state => ({
        total: state.getIn(["resource","resource","allSoftwareTotal"]),
        softwareResource: state.getIn(["resource","resource","softwareResource"]),
        resourceName: state.getIn(["resource","resource","resourceName"]),
        type: state.getIn(["resource","resource","type"]),
        userName: state.getIn(["resource","resource","userName"]),
        searchFlag: state.getIn(["resource","resource","searchFlag"]),
        searchResource: state.getIn(["resource", "searchRes", "searchResource"])
    }),
    dispatch => ({
        handleFetchSoftwareRes(args) {
            dispatch(resource.fetchSoftwareResource(args));
        },
        handleSearchValue(args){
            dispatch(resource.fetchSearchValue(args));
        }
    })
)(Software);