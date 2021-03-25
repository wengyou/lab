import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import "../static/style/search.scss";
import { Table } from 'antd';
import * as resource from "../redux/actionCreators/resource";
import * as admin from "../redux/actionCreators/admin";

const StudentTable = props => {
    const {studentMessage, total, handleSearchStudent, userId, userName, page, resetPassword, reUserId} = props;
    const [current, setCurrent] = useState(1);
    useEffect(()=>{
        setCurrent(page);
    },[page]);
    const columns = [
        {
            key: '1',
            title: '学号',
            dataIndex: 'userId',
        },
        {
            key: '2',
            title: '学生姓名',
            dataIndex: 'userName',
        },
        {
            key: '3',
            title: '性别',
            dataIndex: 'sex',
        },
        {
            key: '4',
            title: '',
            dataIndex: 'resetPassword',
            render: (text, record) => {
                return (<a
                            onClick={() => {resetPassword({'id': record.userId, 'userId': reUserId})}}
                        >
                                重置密码
                        </a>)

            }
        }
    ];
    const rowSelection = {
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    return(
        <Table
            rowKey={record => record.id}
            dataSource={studentMessage}
            rowSelection={rowSelection}
            columns={columns}
            pagination={
                {
                    current,
                    total,
                    pageSize: 10,
                    onChange: e => {
                            handleSearchStudent({
                                page: e,
                                type: "student",
                                userId,
                                userName
                            })
                    },
                    defaultCurrent: 1,
                }
            }
        />
    )
};

export default connect(
    state => ({
        studentMessage: state.getIn(["resource", "resource", "studentMessage"]),
        total: state.getIn(["resource", "resource", "studentTotal"]),
        userId: state.getIn(["resource", "resource", "studentId"]),
        userName: state.getIn(["resource", "resource", "studentName"]),
        page: state.getIn(["resource", "resource", "page"]),
        reUserId: state.getIn(['userMana', 'common', 'userId'])
    }),
    dispatch => ({
        handleSearchStudent(args){
            dispatch(resource.fetchStudentMes(args))
        },
        resetPassword(args) {
            dispatch(admin.resetPassword(args))
        }
    })
)(StudentTable);
