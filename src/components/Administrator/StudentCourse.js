import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Table, Button, Modal, Icon, Select, Input} from "antd";
import * as admin from "../../redux/actionCreators/admin";
const { confirm } = Modal;
const { Option } = Select;
const { Search } = Input;
const Reg = /^[\s\S]*.*[^\s][\s\S]*$/;
const StudentCourse = props => {
    const { studentCourseFlag, studentCourses, studentCourseTotal, handleQueryStudentCourse, handleDeleteStudentCourse } = props;
    const [deleteBtn, setDeleteBtn] = useState(true);
    const [searchFlag, setSearchFlag] = useState("studentName");
    const [presentPage, setPresentPage] =useState(1);
    const [arr, setArr] = useState([]);
    const [selected, setSelected] = useState();
    const [selectedKey, setSelectedKey] = useState();
    useEffect(()=>{
        handleQueryStudentCourse(
            presentPage === 1 ?
                {page: 1, studentName: "", studentId: ""} :
                (Math.ceil(studentCourseTotal / 10) > presentPage ?
                        {page: presentPage, studentName: "", studentId: "",} :
                        {page: presentPage - 1, studentName: "", studentId: "",}
                ));
    },[studentCourseFlag]);
    const columns = [
        { title: "课程名", dataIndex: "courseName", key: "courseName"},
        { title: "课程编号", dataIndex: "courseNumber", key: "courseNumber"},
        { title: "学号", dataIndex: "studentId", key: "studentId" },
        { title: "学生姓名", dataIndex: "studentName", key: "studentName"},
        { title: "添加时间", dataIndex: "addTime", key: "addTime"},
    ];
    return (
        <div style={{ margin: "0.625rem" }}>
            <div style={{display: "flex"}}>
                <Button
                    disabled={deleteBtn}
                    style={{margin: "0 0.625rem"}}
                    onClick={()=>confirm({
                        title: '确认删除吗?',
                        onOk(){
                            selected.map(e=> (
                                arr.push(e.studentCourseId)
                            ));
                            handleDeleteStudentCourse({
                                studentCourseIdList: arr,
                            });
                            setSelectedKey([]);
                            setArr([]);
                            setDeleteBtn(true);
                        },
                        onCancel(){

                        }

                    })}
                >
                    <Icon type={"delete"} />
                    删除课程
                </Button>
                <div  style={{display: "flex", flexWrap: "nowrap", width: "20rem"}}>
                    <Select
                        defaultValue={"studentName"}
                        style={{ width: "4.375rem" }}
                        onChange={e=>setSearchFlag(e)}
                    >
                        <Option value={"studentName"}>姓名</Option>
                        <Option value={"studentId"}>学号</Option>
                    </Select>
                    <Search
                        placeholder="请输入搜索内容"
                        onSearch={(value) =>{
                            Reg.test(value) ?
                                handleQueryStudentCourse(
                                    searchFlag === "studentName" ? {
                                        page: 1,
                                        studentName: value,
                                        studentId: "",
                                    } : {
                                        page: 1,
                                        studentName: "",
                                        studentId: value,
                                    }
                                ) :
                                handleQueryStudentCourse({
                                    page: 1,
                                    studentName: "",
                                    studentId: "",
                                });
                            setPresentPage(1);
                        }}
                        enterButton
                        style={{ width: 200 }}
                    />
                </div>
            </div>
            <Table
                rowKey={e=>e.studentCourseId}
                dataSource={[...studentCourses]}
                columns={columns}
                pagination={{
                    current: presentPage,
                    total: studentCourseTotal,
                    onChange: (e) => {
                        handleQueryStudentCourse({ page: e, studentName: "", studentId: "",});
                        setPresentPage(e);
                        setSelectedKey([]);
                    }
                }}
                rowSelection ={{
                    selectedRowKeys: selectedKey,
                    onChange: (selectedRowKeys, selectedRows) => {
                        setSelected(selectedRows);
                        setSelectedKey(selectedRowKeys);
                        selectedRowKeys.length > 0 ? setDeleteBtn(false) : setDeleteBtn(true);
                    }
                }}
            />
        </div>
    )
};
export default connect(
    state => ({
        studentCourseFlag: state.getIn(["admin", "labCourse", "studentCourseFlag"]),
        studentCourses: state.getIn(["admin", "labCourse", "studentCourses"]),
        studentCourseTotal: state.getIn(["admin", "labCourse", "studentCourseTotal"]),
        userId: state.getIn(["userMana", "common", "userId"]),
    }),
    dispatch => ({
        handleQueryStudentCourse(args){
            dispatch(admin.queryStudentCourse(args))
        },
        handleDeleteStudentCourse(args){
            dispatch(admin.deleteStudentCourse(args))
        }

    }),
)(StudentCourse);
