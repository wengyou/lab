import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Table, Button, Icon, Modal, Select, Input} from "antd";
import * as course from "../../redux/actionCreators/resource";
import * as admin from "../../redux/actionCreators/admin";
const { Option } = Select;
const { Search } = Input;
const Reg = /^[\s\S]*.*[^\s][\s\S]*$/;

const TeacherCourse = props => {
    const {taskTotal,teacherCourseFlag,  userId, courseResource, handleFetchCourseRes, handleDeleteTeacherCourse, handleSearchCourse} = props;
    const [selected, setSelected] = useState([]);
    const [selectedRow, setSelectedRow] = useState([]);
    const [deleteBtn, setDeleteBtn] = useState(true);
    const [presentPage, setPresentPage] = useState(1);
    const [arr, setArr] = useState([]);
    const [searchFlag, setSearchFlag] = useState("courseName");
    const { confirm } = Modal;
    useEffect(()=>{
        handleFetchCourseRes(
            presentPage === 1 ?
                {page: 1, userId: userId} :
                (Math.ceil(taskTotal / 10) > presentPage ?
                        {page: presentPage, userId: userId} :
                        {page: presentPage - 1, userId: userId}
                ));
    },[teacherCourseFlag]);
    const columns = [
        { title: '实验课程', dataIndex: 'courseName', key: 'courseName' },
        { title: '教学班编号', dataIndex: 'courseId', key: 'courseId' },
        { title: '教学班备注', dataIndex: 'remark', key: 'remark' },
        { title: '课程编号', dataIndex: 'courseNumber', key: 'courseNumber' },
        { title: '课程教师', dataIndex: 'teacherName', key: 'teacherName' },
        { title: '发布时间', dataIndex: 'addTime', key: 'addTime' },
    ];
    return (
        <div
            style={{margin: "0.625rem",}}
        >
            <div
                style={{display: "flex", }}
            >
                <Button
                    disabled={deleteBtn}
                    style={{margin: " 0 0.625rem"}}
                    onClick={()=>confirm({
                        title: '确认删除吗?',
                        onOk() {
                            setSelected([]);
                            setDeleteBtn(true);
                            selectedRow.map(e => (arr.push(e.teacherCourseId)));
                            handleDeleteTeacherCourse({
                                teacherCourseIdList: arr,
                            });
                            setArr([]);
                        },
                        onCancel() {
                        },
                    })}
                >
                    <Icon type={"delete"}/>
                    删除课程
                </Button>
                <div  style={{display: "flex", flexWrap: "nowrap", width: "20rem"}}>
                    <Select
                        defaultValue={"courseName"}
                        style={{ width: "5.625rem" }}
                        onChange={e=>(setSearchFlag(e))}
                    >
                        <Option value={"courseName"}>课程名</Option>
                        <Option value={"teacherName"}>教师名</Option>
                    </Select>
                    <Search
                        placeholder="请输入搜索内容"
                        onSearch={(value) =>{
                            Reg.test(value) ?
                                handleSearchCourse(
                                    searchFlag === "teacherName" ? {
                                        page: 1,
                                        teacherName: value,
                                        course: "",
                                        userId: userId,
                                    } : {
                                        page: 1,
                                        teacherName: "",
                                        course: value,
                                        userId: userId
                                    }
                                ) : handleSearchCourse({
                                        page: 1,
                                        teacherName: "",
                                        course: "",
                                        userId: userId,
                                });
                            setPresentPage(1);
                        }}
                        enterButton
                        style={{ width: 200 }}
                    />
                </div>
            </div>
            <Table
                rowKey={record => record.teacherCourseId}
                columns={columns}
                dataSource={courseResource}
                pagination={{
                    total: taskTotal,
                    current: presentPage,
                    onChange: e => {
                        handleFetchCourseRes({ page: e, userId: userId });
                        setSelected([]);
                        setPresentPage(e);
                    },
                }}

                rowSelection ={{
                    selectedRowKeys: selected,
                    onChange: (selectedRowKeys, selectedRows) => {
                        setSelectedRow(selectedRows);
                        setSelected(selectedRowKeys);
                        selectedRowKeys.length > 0 ? setDeleteBtn(false) : setDeleteBtn(true);
                    }
                }}
            />
        </div>
    )

};
export default connect(
    state => ({
        taskTotal: state.getIn(["course", "taskTotal"]),
        courseResource: state.getIn(["course", "courseResource"]),
        courseTask: state.getIn(["course", "courseTask"]),
        userId: state.getIn(["userMana", "common", "userId"]),
        teacherCourseFlag: state.getIn(["admin", "labCourse", "teacherCourseFlag"])
    }),
    dispatch => ({
        handleFetchCourseRes(args){
            dispatch(course.fetchCourse(args));
        },
        handleSearchCourse(args){
            dispatch(course.fetchSearchCourse(args));
        },
        handleDeleteTeacherCourse(args){
            dispatch(admin.deleteTeacherCourses(args))
        },
    }),
)(TeacherCourse);
