import React, {useRef, useState} from "react";
import { connect } from "react-redux";
import "../static/style/search.scss";
import { Table } from 'antd';
import * as resource from "../redux/actionCreators/resource";

const StudentTable = props => {
    const {studentMessage, total} = props;
    const columns = [
        {
            title: '学号',
            dataIndex: 'userId',
        },
        {
            title: '学生姓名',
            dataIndex: 'userName',
        },
        {
            title: '性别',
            dataIndex: 'sex',
        },
        {
            title: '登录密码',
            dataIndex: 'password',
        },
    ];
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    return(
        <Table
            dataSource={studentMessage}
            rowSelection={rowSelection}
            columns={columns}
            pagination={
                {
                    total,
                    pageSize: 5,
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
    }),
    dispatch => ({

    })
)(StudentTable);