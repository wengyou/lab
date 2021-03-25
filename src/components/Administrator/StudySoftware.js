import React, {useEffect, useRef, useState} from "react";
import { connect } from "react-redux";
import {Button, Table, Input, Select,Upload, Icon} from 'antd';
import * as admin from "../../redux/actionCreators/admin";
import * as resource from "../../redux/actionCreators/resource";
import "../../static/style/admin.scss";
const { Search } = Input;
const InputGroup = Input.Group;
const { Option } = Select;

const mapStateToState = state => ({
    softwareData: state.getIn(["admin", "resourceManage", "softwareData"]),
    total: state.getIn(["admin", "resourceManage", "softwareTotal"]),
    userId: state.getIn(["userMana", "common", "userId"]),
    page: state.getIn(["admin", "resourceManage", "softwarePage"]),
    temp: state.getIn(["admin", "resourceManage", "temp"]),
    searchFlag: state.getIn(["admin", "resourceManage", "softwareSearchFlag"]),
    softwareDataTemp: state.getIn(["resource", "resource", "softwareDataTemp"])
});

const mapDispatchToProps = dispatch => ({
    handleAdminSoftwareData(args) {
        dispatch(admin.fetchAdminSoftwareData(args))
    },
    handleDeleteSoftwareData(args) {
        dispatch(admin.deleteSoftwareData(args))
    },
    handleSearchSoftwareData(args) {
        dispatch(admin.searchSoftwareData(args));
    },
    handleImportSoftware(args) {
        dispatch(admin.importSoftware(args));
    },
    handleDownloadSoftware(args) {
        dispatch(resource.downloadSoftware(args));
    }
});

const StudySoftware = props => {
    const {
        temp,
        softwareDataTemp,
        total,
        handleAdminSoftwareData,
        handleDeleteSoftwareData,
        handleSearchSoftwareData,
        handleImportSoftware,
        handleDownloadSoftware,
        softwareData,
        userId,
        page,
        searchFlag,
    } = props;
    const columns = [
        {
            key: '1',
            title: '软件名称',
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
            title: '软件下载',
            dataIndex: "url",
            render: (text, record) => (
                <a
                    download={{text}.text}
                    href={{text}.text}
                    onClick={
                        () => {
                            handleDownloadSoftware({
                                id: record.id,
                                type: "software"
                            });
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
    let flag = "softwareName";
    const clearCheck = () => {
        setSelectedRowKeys([])
    };
    useEffect(() => {
        handleAdminSoftwareData(
            presentPage === 1 ?
                {page: 1, type: "software"} :
                (Math.ceil(total / 10) > presentPage ?
                        {page: presentPage, type: "software"} :
                        {page: presentPage - 1, type: "software"}
                ));
    }, [temp, softwareDataTemp]);
    useEffect(() => {
        setCurrent(page)
    },[page]);
    return (
        <>
            <div className={"adminTop"}>
                <Upload
                    style={{marginLeft: "0.5rem"}}
                    beforeUpload={
                        (file, FileList) => {
                            setFile(file);
                        }
                    }
                    customRequest={
                        () => {
                            handleImportSoftware({
                                type: "software",
                                userId: userId,
                                file: file
                            })
                        }
                    }
                    showUploadList={false}
                >
                    <Button>
                        <Icon type="upload" /> 上传软件
                    </Button>
                </Upload>
                <Button
                    disabled={deleteBtn}
                    style={{marginLeft: "0.5rem"}}
                    icon={"close"}
                    onClick={
                        () => {
                            handleDeleteSoftwareData({
                                list: list,
                                type: "software",
                                userId: userId
                            })
                        }
                    }
                >
                    删除软件
                </Button>
                <InputGroup
                    compact
                    style={{display: "flex", flexWrap: "nowrap", width: "20rem", marginLeft: "0.5rem"}}
                >
                    <Select
                        defaultValue="softwareName"
                        onChange={
                            value => flag = value
                        }
                    >
                        <Option value="softwareName">软件名</Option>
                        <Option value="userName">上传人</Option>
                    </Select>
                    <Search
                        placeholder={"请输入搜索内容"}
                        onSearch={
                            value => {
                                handleSearchSoftwareData({
                                    page: 1,
                                    value,
                                    type: "software",
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
                dataSource={ Array.from(softwareData)}
                pagination={{
                    total,
                    current,
                    onChange: (page) => {
                        !searchFlag ?
                        handleAdminSoftwareData({
                            page: page,
                            type: "software"
                        }):
                            handleSearchSoftwareData({
                                page: page,
                                value,
                                type: "software",
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

export default connect(mapStateToState, mapDispatchToProps)(StudySoftware);
