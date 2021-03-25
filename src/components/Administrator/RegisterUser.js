import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Button, Table } from 'antd';
import * as admin from "../../redux/actionCreators/admin";
import "../../static/style/admin.scss";
const RegisterUser = props => {
    const { total,
        adminRegisterUserData,
        handleRegisterUserData,
        userId,
        handleAgreeRegister,
        handleDeleteRegisterUser,
        temp
    } = props;
    const columns = [
        {
            key: '1',
            title: '学号',
            dataIndex: 'userId',
        },
        {
            key: '2',
            title: '学生姓名',
            dataIndex: 'userName'
        },
        {
            key: '3',
            title: '年级',
            dataIndex: 'grade'
        },
        {
            key: '4',
            title: '学院',
            dataIndex: 'academy'
        },
        {
            key: '5',
            title: '专业',
            dataIndex: 'discipline'
        },
        {
            key: '6',
            title: '班级',
            dataIndex: 'cls'
        },
        {
            key: '7',
            title: '性别',
            dataIndex: 'sex'
        },
        {
            key: '8',
            title: '电话',
            dataIndex: 'phone'
        },
        {
            key: '9',
            title: '教师姓名',
            dataIndex: 'teacherName',
        },
        {
            key: '10',
            title: '注册时间',
            dataIndex: 'registerDate',
        },
        {
            key: '11',
            title: '授权状态',
            dataIndex: 'state',
            render: (text, record) => <span style={text==="yes"?{color: "#000000"}: {color: "#FF0000"}}>
                {text==="yes"?text="已被授权":text="未被授权"}
            </span>
        }
    ];
    const [$selectedRowKeys, changeSelectedRowKeys] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [list, setList] = useState([]);
    const [presentPage, setPresentPage] = useState(1);
    const [deleteBtn, setDeleteBtn ] = useState(true);
    const clearCheck = () => {
        setSelectedRowKeys([])
    };
    useEffect(() => {
        handleRegisterUserData(
            presentPage === 1 ?
                {page: 1, type: "admin"} :
                (Math.ceil(total / 10) > presentPage ?
                        {page: presentPage, type: "admin"} :
                        {page: presentPage - 1, type: "admin"}
                ));
    }, [temp]);
    return (
        <div className={"adminTop"}>
            <Button
                disabled={deleteBtn}
                style={{marginLeft: "0.5rem"}}
                icon={"diff"}
                onClick={
                    () => {
                        handleAgreeRegister({
                            list: list
                        })
                    }
                }
            >
                批量授权
            </Button>
            <Button
                style={{marginLeft: "0.5rem"}}
                disabled={deleteBtn}
                icon={"close"}
                onClick={
                    () => {
                        handleDeleteRegisterUser({
                            list: list
                        })
                    }
                }
            >
                删除用户
            </Button>
            <Table
                tableLayout={"fixed"}
                rowKey={record => record.id}
                size={"middle"}
                columns={ columns }
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
                dataSource={Array.from(adminRegisterUserData)}
                pagination={{
                    total,
                    pageSize: 10,
                    defaultCurrent: 1,
                    onChange: e => {
                        handleRegisterUserData({
                            page: e,
                            type: "admin",
                            userId: userId
                        });
                        setPresentPage(e);
                        clearCheck();
                    }
                }}
            />
        </div>
    )

};
export default connect(
    state => ({
        userId: state.getIn(["userMana", "common", "userId"]),
        adminRegisterUserData: state.getIn(["admin", "userManage", "adminRegisterUserData"]),
        total: state.getIn(["admin", "userManage", "registerUserTotal"]),
        temp: state.getIn(["admin", "userManage", "temp"])
    }),
    dispatch => ({
        handleRegisterUserData(args){
            dispatch(admin.fetchRegisterUserData(args));
        },
        handleAgreeRegister(args) {
            dispatch(admin.agreeRegister(args));
        },
        handleDeleteRegisterUser(args) {
            dispatch(admin.deleteRegisterUser(args));
        }
    })
)(RegisterUser);
