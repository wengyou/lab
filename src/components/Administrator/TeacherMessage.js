import React, {useEffect, useRef, useState} from "react";
import { connect } from "react-redux";
import {Button, Table, Input, Modal, Dropdown, Menu} from 'antd';
import * as admin from "../../redux/actionCreators/admin";
import "../../static/style/admin.scss";
import {openNotification} from "../../utils/commonFunction";
const { Search } = Input;
const mapStateToState = state => ({
    total: state.getIn(["admin", "userManage", "teacherTotal"]),
    adminTeacherData: state.getIn(["admin", "userManage", "adminTeacherData"]),
    temp: state.getIn(["admin", "userManage", "temp"]),
    addTeacherFlag: state.getIn(["admin", "userManage", "addTeacherFlag"]),
    modifyTeacherTemp: state.getIn(["admin", "userManage", "modifyTeacherTemp"]),
    teacherPage: state.getIn(["admin", "userManage", "teacherPage"]),
    searchFlag: state.getIn(["admin", "userManage", "teacherSearchFlag"]),
    userId_i: state.getIn(["userMana", "common", "userId"]),
});

const mapDispatchToProps = dispatch => ({
    handleTeacherData(args){
        dispatch(admin.fetchTeacherData(args));
    },
    handleAddTeacher(args) {
        if(args.userId.length < 4 || args.userId.length > 30){
            openNotification("教师编号请输入4-30位的教师编号")
        } else if(args.userName.length <2 || args.userName.length > 30){
            openNotification("教师名字请输入2-30位的名字")
        } else if (args.phone === null || args.phone.length <5 || args.phone.length > 30){
            openNotification("电话请输入5-30位的数字")
        } else {
            dispatch(admin.addNewTeacher(args));
        }
    },
    handleDeleteTeacher(args) {
        dispatch(admin.deleteTeacher(args));
    },
    handleModifyTeacher(args) {
        console.log(args)
        if(args.userId.length < 4 || args.userId.length > 30){
            openNotification("教师编号请输入4-30位的教师编号")
        } else if(args.userName.length <2 || args.userName.length > 30){
            openNotification("教师名字请输入2-30位的名字")
        } else if (args.phone === null || args.phone.length <5 || args.phone.length > 30){
            openNotification("电话请输入5-30位的数字")
        } else {
            dispatch(admin.modifyTeacher(args));
        }
    },
    handleSearchTeacherData(args) {
        dispatch(admin.searchTeacher(args))
    },
    resetPassword(args) {
        dispatch(admin.resetPassword(args))
    }
});

const TeacherMessage = props => {
    const {
        total,
        adminTeacherData,
        handleTeacherData,
        handleAddTeacher,
        handleDeleteTeacher,
        handleModifyTeacher,
        temp,
        addTeacherFlag,
        modifyTeacherTemp,
        handleSearchTeacherData,
        teacherPage,
        searchFlag,
        userId_i,
        resetPassword
    } = props;
    const userId = useRef();
    const userName = useRef();
    const phone = useRef();
    const department = useRef();
    const academy = useState();
    const [id, setId] = useState("");
    const isEditing = record => record.id === id;
    const columns = [
        {
            key: '1',
            title: '教师账号',
            dataIndex: 'userId',
            editable: true
        },
        {
            key: '2',
            title: '教师姓名',
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
            title: '电话',
            render: (text, record) => {
                console.log(record)
                return isEditing(record) ? (
                    <Input ref={phone} defaultValue={record.phone} />
                ):(
                    <span>{record.phone}</span>
                )
            },
            editable: true
        },
        {
            key: '5',
            title: '教师部门',
            render: (text, record) => {
                return isEditing(record) ? (
                    <Input ref={department} defaultValue={record.discipline} />
                ):(
                    <span>{record.discipline}</span>
                )
            },
            editable: true
        },
        {
            key: '6',
            title: '性别',
            dataIndex: 'sex',
            render: (text, record) => {
                return isEditing(record) ? (
                    <Dropdown overlay={menu}>
                        <Button style={{ padding: "0 20px" }}>{record.sex}</Button>
                    </Dropdown>
                ):(
                    <span>{record.sex}</span>
                )
            },
            editable: true
        },
        {
            key: '7',
            title: '',
            dataIndex: 'operation',
            render: (text, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <a
                        onClick={
                            () => {
                                handleModifyTeacher({
                                    userId: record.userId,
                                    userName: userName.current.state.value,
                                    academy: academy.current.state.value,
                                    phone: phone.current.state.value,
                                    discipline: department.current.state.value,
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
        },
        {
            key: '8',
            title: '',
            dataIndex: 'resetPassword',  
            render: (text, record) => {
                return (<a 
                            onClick={() => {resetPassword({'id': record.userId, 'userId': userId_i})}}
                        >
                                重置密码
                        </a>)
                
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
    const [sex, setSex] = useState("");
    const [list, setList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [value, setValue ] = useState("");
    const [presentPage, setPresentPage] = useState(1);
    const [deleteBtn, setDeleteBtn ] = useState(true);
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
    useEffect(()=> {
        handleTeacherData(
            presentPage === 1 ?
                {page: 1, type: "teacher"} :
                (Math.ceil(total / 10) > presentPage ?
                        {page: presentPage, type: "teacher"} :
                        {page: presentPage - 1, type: "teacher"}
                ));
        clearCheck()
    }, [temp, modifyTeacherTemp]);

    useEffect(() => {
        changeAddFlag(false);
    },[addTeacherFlag]);

    return (
        <>
            <div className="adminTop">
                <Button
                    style={{marginLeft: '0.5rem'}}
                    onClick={ () => changeAddFlag(true)}
                    icon={"plus"}
                >
                    添加教师
                </Button>
                <Button
                    disabled={deleteBtn}
                    icon={"close"}
                    style={{marginLeft: "0.5rem"}}
                    onClick={ () => {
                        handleDeleteTeacher({list: list})
                    }}
                >
                    删除教师
                </Button>
                <Search
                    style={{width: "20rem", marginLeft: "0.5rem"}}
                    placeholder="请输入老师姓名"
                    onSearch={
                        (e) => {
                            handleSearchTeacherData({
                                page: 1,
                                type: "teacher",
                                userName: e,
                            });
                            setValue(e);
                        }
                    }
                    enterButton
                />
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
                        setList(userId);
                        changeSelectedRowKeys(userId);
                        selectedRowKeys.length > 0 ? setDeleteBtn(false) : setDeleteBtn(true);
                        setSelectedRowKeys(selectedRowKeys);
                    },
                }}
                dataSource={ Array.from(adminTeacherData) }
                pagination={{
                    total,
                    defaultCurrent: 1,
                    current: presentPage,
                    onChange: e => {
                        !searchFlag ?
                        handleTeacherData({page: e, type: "teacher"}):
                            handleSearchTeacherData({
                                page: e,
                                type: "teacher",
                                userName: value
                            });
                        setPresentPage(e);
                        clearCheck();
                    }
                }}
            />
            {/* 添加教师 */}
            <Modal
                destroyOnClose={true}
                title={"添加教师"}
                visible={addFlag}
                onCancel={
                    () => {
                        changeAddFlag(false);
                    }
                }
                okText="添加"
                onOk={() => {
                    handleAddTeacher({
                        type: "teacher",
                        userId: userId.current.state.value,
                        userName: userName.current.state.value,
                        phone: phone.current.state.value,
                        discipline: department.current.state.value,
                        adminTeacherData,
                        sex,
                    });
                }}
            >
                <div className="_wrap row row-start-center">
                    <label>教师账号：</label>
                    <Input ref={userId} />
                </div>
                <div className="_wrap row row-start-center">
                    <label>教师姓名：</label>
                    <Input ref={userName} />
                </div>
                <div className="_wrap row row-start-center">
                    <label>教师电话：</label>
                    <Input ref={phone} />
                </div>
                <div className="_wrap row row-start-center">
                    <label>教师部门：</label>
                    <Input ref={department} />
                </div>
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

export default connect(mapStateToState, mapDispatchToProps)(TeacherMessage);
