import React from "react";
import { Table } from "antd";
import { connect } from "react-redux";

const SubmitWork = props => {
    const { submitList, submitTotal } = props;

    const columns = [
        {title: "学生姓名", dataIndex: "name", key: "name"},
        {title: "学号", dataIndex: "studentId", key: "studentId"},
        {title: "作业名称", dataIndex: "workName", key: "workName"},
        {title: "上传时间", dataIndex: "addTime", key: "addTime"}
    ];
    return(
        <div>
            <Table
                pagination={{
                    total: submitTotal
                }}
                dataSource={submitList}
                columns={columns}
            />
        </div>
    )
};
export default connect(
    state => ({
        submitList: state.getIn(["course", "submitList"])
    }),
    dispatch => ({

    })
)(SubmitWork);

