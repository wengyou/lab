import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {Button, Table, Input, Modal, Dropdown, Menu, Select, Upload, Icon } from 'antd';
import * as admin from "../../redux/actionCreators/admin";
import "../../static/style/admin.scss";
import {openNotification} from "../../utils/commonFunction";
const { Search } = Input;
const InputGroup = Input.Group;
const { Option } = Select;
const StudentInformation = props => {
    const {
        total,
        adminStudentData,
        handleStudentData,
        handleAddStudent,
        handleDeleteStudent,
        handleModifyStudent,
        handleSearchAdminStudent,
        handleImportUser,
        addStudentFlag,
        temp,
        modifyStudentTemp,
        searchFlag,
        resetPassword,
        userId_i,
        addVisible
    } = props;
    const [id, setId] = useState("");
    const isEditing = record => record.id === id;
    const userId = useRef();
    const userName = useRef();
    const phone = useRef();
    const academy = useState();
    const grade = useRef();
    const discipline = useRef();
    const cls = useRef();
    const columns = [
        {
            // width: '6.5rem',
            key: '1',
            title: '学号',
            dataIndex: 'userId',
            editable: true
        },
        {
            // width: '5rem',
            key: '2',
            title: '学生姓名',
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
            title: '年级',
            render: (text, record) => {
                return isEditing(record) ? (
                    <Input ref={grade} defaultValue={record.grade} />
                ):(
                    <span>{record.grade}</span>
                )
            },
            editable: true

        },
        {
            // width: '7rem',
            key: '4',
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
            // width: '7rem',
            key: '5',
            title: '专业',
            render: (text, record) => {
                return isEditing(record) ? (
                    <Input ref={discipline} defaultValue={record.discipline} />
                ):(
                    <span>{record.discipline}</span>
                )
            },
            editable: true
        },
        {
            // width: '6rem',
            key: '6',
            title: '班级',
            render: (text, record) => {
                return isEditing(record) ? (
                    <Input ref={cls} defaultValue={record.cls} />
                ):(
                    <span>{record.cls}</span>
                )
            },
            editable: true
        },
        {
            // width: '6.5rem',
            key: '7',
            title: '电话',
            render: (text, record) => {
                return isEditing(record) ? (
                    <Input ref={phone} defaultValue={record.phone} />
                ):(
                    <span>{record.phone}</span>
                )
            },
            editable: true
        },
        {
            key: '8',
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
            // width: '6rem',
            key: '9',
            title: '注册时间',
            dataIndex: 'registerDate',
            editable: true,
        },
        {
            key: '10',
            title: '',
            dataIndex: 'operation',
            render: (text, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <a
                        onClick={
                            () => {
                                handleModifyStudent({
                                    userId: record.userId,
                                    userName: userName.current.state.value,
                                    grade: grade.current.state.value,
                                    academy: academy.current.state.value,
                                    discipline: discipline.current.state.value,
                                    cls: cls.current.state.value,
                                    phone: phone.current.state.value,
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
            key: '11',
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
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [sex, setSex] = useState("男");
    const [list, setList] = useState([]);
    const [file, setFile ] = useState();
    const [value, setValue] = useState("");
    const [presentPage, setPresentPage] = useState(1);
    const [deleteBtn, setDeleteBtn ] = useState(true);
    let flag = "userName";
    function onClick(e) {
        setSex(e.key);
    }
    const clearCheck = () => {
        setSelectedRowKeys([])
    };
    const menu = (
        <Menu onClick={onClick}>
            <Menu.Item style={{ textAlign: "center" }} key="男">男</Menu.Item>
            <Menu.Item style={{ textAlign: "center" }} key="女">女</Menu.Item>
        </Menu>
    );
    useEffect(() => {
        handleStudentData(
            presentPage === 1 ?
                {page: 1, type: "student"} :
                (Math.ceil(total / 10) > presentPage ?
                        {page: presentPage, type: "student"} :
                        {page: presentPage - 1, type: "student"}
                ));
    },[temp, modifyStudentTemp]);
    useEffect(() => {
        changeAddFlag(false);
    },[addStudentFlag]);
    useEffect(() => {
        changeAddFlag(addVisible)
    }, [addVisible])
    return (
        <>
            <div className="adminTop">
                <Button
                    onClick={() => changeAddFlag(true)}
                    style={{marginLeft: "0.5rem"}}
                    icon={"plus"}
                >
                    添加学生
                </Button>
                <Button
                    disabled={deleteBtn}
                    style={{marginLeft: "0.5rem"}}
                    icon={"close"}
                    onClick={
                        () => {
                            handleDeleteStudent({list: list})
                        }
                    }
                >
                    删除学生
                </Button>
                <Upload
                    style={{marginLeft: "0.5rem"}}
                    name={"file"}
                    beforeUpload={
                        (file, FileList) => {
                            setFile(file);
                        }
                    }
                    customRequest={
                        () => {
                            handleImportUser({
                                file
                            })
                        }
                    }
                    showUploadList={false}
                >
                    <Button>
                        <Icon type="upload" /> 批量导入学生
                    </Button>
                </Upload>
                <InputGroup
                    compact
                    style={{display: "flex", flexWrap: "nowrap", width: "20rem", marginLeft: "0.5rem"}}
                >
                    <Select
                        defaultValue="userName"
                        onChange={
                            value => flag = value
                        }
                    >
                        <Option value="userName">姓名</Option>
                        <Option value="userId">学号</Option>
                        <Option value="grade">年级</Option>
                    </Select>
                    <Search
                        placeholder={"请输入搜索内容"}
                        onSearch={
                            value => {
                                handleSearchAdminStudent({
                                    page: 1,
                                    value,
                                    type: "student",
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
                        setSelectedRowKeys(selectedRowKeys);
                        selectedRowKeys.length > 0 ? setDeleteBtn(false) : setDeleteBtn(true);
                    },
                }}
                dataSource={ Array.from(adminStudentData)}
                pagination={{
                    total,
                    pageSize: 10,
                    defaultCurrent: 1,
                    current: presentPage,
                    onChange: e => {
                        !searchFlag ?
                        handleStudentData({
                            page: e,
                            type: "student"
                        }) :
                            handleSearchAdminStudent({
                                page: e,
                                value,
                                type: "student",
                                flag: flag
                            });
                        setPresentPage(e);
                        clearCheck();
                    }
                }}
            />
            {/* 添加学生 */}
            <Modal
                destroyOnClose={true}
                title={"添加学生"}
                visible={addFlag}
                onCancel={
                    () => {
                        changeAddFlag(!addFlag);
                    }
                }
                okText="添加"
                onOk={() => {
                    handleAddStudent({
                        type: "student",
                        userId: userId.current.state.value,
                        userName: userName.current.state.value,
                        grade: grade.current.state.value,
                        academy: academy.current.state.value,
                        discipline: discipline.current.state.value,
                        cls: cls.current.state.value,
                        phone: phone.current.state.value,
                        sex,
                        adminStudentData
                    });
                }}
            >
                <div className="_wrap row row-start-center">
                    <label>学号：</label>
                    <Input ref={userId} />
                </div>
                <div className="_wrap row row-start-center">
                    <label>姓名：</label>
                    <Input ref={userName} />
                </div>
                <div className="_wrap row row-start-center">
                    <label>年级：</label>
                    <Input ref={grade} />
                </div>
                <div className="_wrap row row-start-center">
                    <label>学院：</label>
                    <Input ref={academy} />
                </div>
                <div className="_wrap row row-start-center">
                    <label>专业：</label>
                    <Input ref={discipline} />
                </div>
                <div className="_wrap row row-start-center">
                    <label>班级：</label>
                    <Input ref={cls} />
                </div>
                <div className="_wrap row row-start-center">
                    <label>电话：</label>
                    <Input ref={phone} />
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
export default connect(
    state => ({
        total: state.getIn(["admin", "userManage", "studentTotal"]),
        adminStudentData: state.getIn(["admin", "userManage", "adminStudentData"]),
        addStudentFlag: state.getIn(["admin", "userManage", "addStudentFlag"]),
        temp: state.getIn(["admin", "userManage", "temp"]),
        modifyStudentTemp: state.getIn(["admin", "userManage", "modifyStudentTemp"]),
        studentPage: state.getIn(["admin", "userManage", "studentPage"]),
        searchFlag: state.getIn(["admin", "userManage", "studentSearchFlag"]),
        userId_i: state.getIn(["userMana", "common", "userId"]),
        addVisible: state.getIn(["admin", "userManage", "addVisible"]),
    }),
    dispatch => ({
        handleStudentData(args) {
            dispatch(admin.fetchStudentData(args));
        },
        handleAddStudent(args) {
            if (args.userId.length < 6 || args.userId.length > 30){
                openNotification("请输入6-30位的学号")
            } else if (args.userName.length < 2 || args.userName.length > 10) {
                openNotification("请输入2-10位的名字")
            } else if (args.grade.length !== 4) {
                openNotification("请输入4位数的年级")
            } else if (args.cls.length < 2 || args.cls.length > 30){
                openNotification("请输入2-10位的班级号")
            } else if (args.academy.length > 30) {
                openNotification("学院字数大于30，不符合规定")
            } else if (args.discipline.length > 30) {
                openNotification("专业字数大于30，不符合规定")
            } else if (args.phone.length < 6 || args.phone.length > 30){
                openNotification("请输入6-30位的电话号码")
            } else {
                dispatch(admin.addNewStudent(args));
            }
        },
        handleDeleteStudent(args) {
            dispatch(admin.deleteStudent(args))
        },
        handleModifyStudent(args) {
            dispatch(admin.modifyStudent(args))
        },
        handleSearchAdminStudent(args) {
            dispatch(admin.searchStudent(args))
        },
        handleImportUser(args) {
            dispatch(admin.importUser(args))
        },
        resetPassword(args) {
            dispatch(admin.resetPassword(args))
        }
    })
)(StudentInformation);
