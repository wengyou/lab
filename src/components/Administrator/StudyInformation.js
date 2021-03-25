import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import {Button, Table, Input, Select, Upload, Icon } from 'antd';
import * as admin from "../../redux/actionCreators/admin";
import * as resource from "../../redux/actionCreators/resource";
import "../../static/style/admin.scss";
const { Search } = Input;
const InputGroup = Input.Group;
const { Option } = Select;

const mapStateToState = state => ({
    resourceData: state.getIn(["admin", "resourceManage", "resourceData"]),
    total: state.getIn(["admin", "resourceManage", "resourceTotal"]),
    userId: state.getIn(["userMana", "common", "userId"]),
    page: state.getIn(["admin", "resourceManage", "resourcePage"]),
    temp: state.getIn(["admin", "resourceManage", "temp"]),
    searchFlag: state.getIn(["admin", "resourceManage", "resourceSearchFlag"]),
    learningDataTemp: state.getIn(["resource", "resource", "learningDataTemp"])
});

const mapDispatchToProps = dispatch => ({
    handleAdminResourceData(args) {
        dispatch(admin.fetchAdminResourceData(args))
    },
    handleDeleteResource(args) {
        dispatch(admin.deleteResourceData(args))
    },
    handleSearchResourceData(args) {
        dispatch(admin.searchResourceData(args));
    },
    handleImportResource(args) {
        dispatch(admin.importResource(args));
    },
    handleDownloadResource(args) {
        dispatch(resource.downloadResource(args));
    }
});

const StudyInformation = props => {
    const {
        temp,
        learningDataTemp,
        page,
        total,
        handleAdminResourceData,
        handleDeleteResource,
        handleSearchResourceData,
        handleImportResource,
        handleDownloadResource,
        resourceData,
        userId,
        searchFlag,
    } = props;
    const columns = [
        {
            key: '1',
            title: '资料名称',
            dataIndex: 'title',
        },
        {
            key: '2',
            title: '大小',
            dataIndex: 'size',
        },
        {
            key: '3',
            title: '上传人',
            dataIndex: 'userName',
        },
        {
            key: '4',
            title: '上传时间',
            dataIndex: 'addTime',
        },
        {
            key: '5',
            title: '下载次数',
            dataIndex: 'downloadNum'
        },
        {
            key: '6',
            title: '资料下载',
            dataIndex: "url",
            render: (text, record) => (
                <a
                    download={record.title}
                    href={{text}.text}
                    onClick={
                        () => {
                            handleDownloadResource({
                                id: record.id,
                                type: "material"
                            })
                        }
                    }
                >
                    下载
                </a>
            )
        }
    ];
    const [$selectedRowKeys, changeSelectedRowKeys] = useState([]);
    const [list, setList] = useState([]);
    const [current, setCurrent ] = useState(1);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [file, setFile ] = useState();
    const [value, setValue ] = useState("");
    const [presentPage, setPresentPage] = useState(1);
    const [deleteBtn, setDeleteBtn ] = useState(true);
    let flag = "resourceName";
    const clearCheck = () => {
        setSelectedRowKeys([])
    };
    useEffect(() => {
        handleAdminResourceData(
            presentPage === 1 ?
                {page: 1, type: "material"} :
                (Math.ceil(total / 10) > presentPage ?
                        {page: presentPage, type: "material"} :
                        {page: presentPage - 1, type: "material"}
                ));
    }, [temp, learningDataTemp]);
    useEffect(() => {
        setCurrent(page)
    },[page]);
    return (
        <>
            <div className={"adminTop"}>
                <Upload
                    style={{marginLeft: "0.5rem"}}
                    beforeUpload={
                        (file) => {
                            setFile(file);
                        }
                    }
                    customRequest={
                        () => {
                            handleImportResource({
                                type: "material",
                                userId: userId,
                                file: file
                            })
                        }
                    }
                    showUploadList={false}
                >
                    <Button>
                        <Icon type="upload" /> 上传资料
                    </Button>
                </Upload>
                <Button
                    disabled={deleteBtn}
                    style={{marginLeft: "0.5rem"}}
                    icon={"close"}
                    onClick={
                        () => {
                            handleDeleteResource({
                                list: list,
                                type: "material",
                                userId: userId
                            })
                        }
                    }
                >
                    删除资料
                </Button>
                <InputGroup
                    compact
                    style={{display: "flex", flexWrap: "nowrap", width: "20rem", marginLeft: "0.5rem"}}
                >
                    <Select
                        defaultValue="resourceName"
                        onChange={
                            value => flag = value
                        }
                    >
                        <Option value="resourceName">资料名</Option>
                        <Option value="userName">上传人</Option>
                    </Select>
                    <Search
                        placeholder={"请输入搜索内容"}
                        onSearch={
                            value => {
                                handleSearchResourceData({
                                    page: 1,
                                    value,
                                    type: "material",
                                    flag: flag
                                });
                                setValue(value);
                            }
                        }
                        enterButton
                        style={{width: "16rem"}}
                    />
                </InputGroup>
            </div>
            <Table
                tableLayout={"fixed"}
                rowKey={record => record.id}
                columns={ columns }
                rowSelection={{
                    selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => {
                        const resourceId = selectedRows.map(el => {
                            return el.id;
                        });
                        setList(resourceId);
                        changeSelectedRowKeys(resourceId);
                        setSelectedRowKeys(selectedRowKeys);
                        selectedRowKeys.length > 0 ? setDeleteBtn(false) : setDeleteBtn(true);
                    },
                }}
                dataSource={ Array.from(resourceData)}
                pagination={{
                    total,
                    current,
                    onChange: (page) => {
                        !searchFlag ?
                        handleAdminResourceData({
                            page: page,
                            type: "material"
                        }):
                            handleSearchResourceData({
                                page: page,
                                value,
                                type: "material",
                                flag: flag
                            });
                        clearCheck();
                        setPresentPage(page);
                    }
                }}
            />
        </>
    )
};

export default connect(mapStateToState, mapDispatchToProps)(StudyInformation);
