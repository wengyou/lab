import React, {useEffect, useRef, useState} from "react";
import { connect } from "react-redux";
import {Button, Table, Input,  Modal, Dropdown, Menu} from 'antd';
import * as admin from "../../redux/actionCreators/admin";
import "../../static/style/admin.scss";
import {openNotification} from "../../utils/commonFunction";

const mapStateToState = state => ({
    adminData: state.getIn(["admin", "userManage", "adminData"]),
    total: state.getIn(["admin", "userManage", "adminTotal"]),
    addAdminFlag: state.getIn(["admin", "userManage", "addAdminFlag"]),
    modifyAdminTemp: state.getIn(["admin", "userManage", "modifyAdminTemp"]),
    addVisible: state.getIn(["admin", "userManage", "addVisible"]),
});

const mapDispatchToProps = dispatch => ({
    handleAdminData(args){
        dispatch(admin.fetchAdministratorData(args));
    },
    handleAddAdmin(args) {
        if (args.userId.length < 6 || args.userId.length > 30){
            openNotification("教师编号长度为大于等于6小于等于30的数字，请重新输入")
        } else if (args.userName.length < 2 || args.userName.length > 30) {
            openNotification("教师姓名长度为大于等于2小于等于30的字符，请重新输入")
        } else {
            dispatch(admin.addNewAdmin(args));
        }
    },
    handleModifyAdmin(args) {
        dispatch(admin.modifyAdmin(args));
    }
});

const AdminMessage = props => {
    const {
        handleAdminData,
        handleAddAdmin,
        handleModifyAdmin,
        total,
        adminData,
        addAdminFlag,
        modifyAdminTemp,
        addVisible
    } = props;
    // console.log(adminData)
    const userId = useRef();
    const userName = useRef();
    const phone = useRef();
    const academy = useState();
    const [id, setId] = useState("");
    const isEditing = record => record.id === id;
    const columns = [
        {
            key: '1',
            title: '管理员账号',
            dataIndex: 'userId',
            editable: true
        },
        {
            key: '2',
            title: '管理员姓名',
            render: (text, record) => {
                return isEditing(record) ? (
                    <Input ref={userName} defaultValue={record.userName} />
                ):(
                    <span>{record.userName}</span>
                )
            },
            editable: true
        },
        {
            key: '3',
            title: '学院',
            render: (text, record) => {
                return isEditing(record) ? (
                    <Input ref={academy} defaultValue={record.academy} />
                ):(
                    <span>{record.academy}</span>
                )
            },
            editable: true

        },
        {
            key: '4',
            title: '性别',
            render: (text, record) => {
                return isEditing(record) ? (
                    <Dropdown overlay={menu}>
                        <Button style={{ padding: "0 20px" }}>{sex}</Button>
                    </Dropdown>
                ):(
                    <span>{record.sex}</span>
                )
            },
            editable: true
        },
        {
            key: '5',
            title: '',
            dataIndex: 'operation',
            render: (text, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <a
                        onClick={
                            () => {
                                handleModifyAdmin({
                                    userId: record.userId,
                                    userName: userName.current.state.value,
                                    academy: academy.current.state.value,
                                    sex
                                });
                                setId("")
                            }
                        }
                    >
                        保存
                    </a>
                ) : (
                    <a
                        onClick={ () => setId(record.id)}
                    >
                        修改
                    </a>
                )
            }
        }
    ];
    const $columns = columns.map(el => {
        if (!el.editable) {
            return el;
        }
        return {
            ...el,
            onCell: record => ({
                record,
                dataIndex: el.dataIndex,
                title: el.title,
                editing: isEditing(record),
            })
        }
    });
    const [addFlag, changeAddFlag] = useState(false);
    const [$selectedRowKeys, changeSelectedRowKeys] = useState([]);
    const [sex, setSex] = useState("男");
    const [list, setList] = useState([]);
    const [presentPage, setPresentPage ] = useState(1);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const clearCheck = () => {
        setSelectedRowKeys([])
    };

    function onClick(e) {
        setSex(e.key);
    }
    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item style={{ textAlign: "center" }} key="男">男</Menu.Item>
            <Menu.Item style={{ textAlign: "center" }} key="女">女</Menu.Item>
        </Menu>
    );
    useEffect(() => {
        changeAddFlag(addVisible)
    }, [addVisible])
    useEffect(()=> {
        handleAdminData(
            presentPage === 1 ?
                {page: 1, type: "admin"} :
                (Math.ceil(total / 10) > presentPage ?
                        {page: presentPage, type: "admin"} :
                        {page: presentPage - 1, type: "admin"}
                ));
        clearCheck()
    }, [modifyAdminTemp]);
    useEffect(() => {
        changeAddFlag(false)
    },[addAdminFlag]);

    return (
        <>
            <div>
                <Button
                    style={{margin: "0.5rem 0 0 0.5rem"}}
                    onClick={ () => changeAddFlag(true)}
                    icon={"plus"}
                >
                    添加管理员
                </Button>
            </div>
            {/* 表格 */}
            <Table
                rowKey={record => record.id}
                size={"middle"}
                columns={ $columns }
                rowSelection={{
                    selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => {
                        const userId = selectedRows.map(el => {
                            return el.userId;
                        });
                        console.log(selectedRows);
                        setList(userId);
                        changeSelectedRowKeys(userId);
                        setSelectedRowKeys(selectedRowKeys);
                    },
                }}
                dataSource={ Array.from(adminData)}
                pagination={{
                    total,
                    defaultCurrent: presentPage,
                    onChange: (page) => {
                        handleAdminData({page: page, type: "admin"});
                        setPresentPage(page);
                    }
                }}
            />
            {/* 添加管理员 */}
            <Modal
                destroyOnClose={true}
                title={"添加管理员"}
                visible={addFlag}
                onCancel={
                    () => {
                        changeAddFlag(false);
                    }
                }
                okText="添加"
                onOk={() => {
                    handleAddAdmin({
                        type: "admin",
                        userId: userId.current.state.value,
                        userName: userName.current.state.value,
                        // phone: phone.current.state.value,
                        sex,
                        adminData
                    });
                }}
            >
                <div className="_wrap row row-start-center">
                    <label>管理员账号：</label>
                    <Input ref={userId} />
                </div>
                <div className="_wrap row row-start-center">
                    <label>管理员姓名：</label>
                    <Input ref={userName} />
                </div>
                {/* <div className="_wrap row row-start-center">
                    <label>教师电话：</label>
                    <Input ref={phone} />
                </div> */}
                <div className="_wrap row row-start-center">
                    <label>选择性别：</label>
                    <Dropdown overlay={menu}>
                        <Button style={{ padding: "0 20px" }}>{sex}</Button>
                    </Dropdown>
                </div>
            </Modal>
            <style>
                {
                    `
                    ._wrap {
                        margin-bottom: 20px;
                    }
                    .ant-input {
                        width: 80%;
                    }
                    input {
                        margin: 20px;
                    }
                    `
                }
            </style>
        </>
    )
};

export default connect(mapStateToState, mapDispatchToProps)(AdminMessage);
