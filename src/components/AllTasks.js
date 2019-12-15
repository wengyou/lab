import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Table } from "antd";
import * as course from "../redux/actionCreators/resource";
import SearchCourse from "./SearchCourse";
//老师显示上机任务的第三个
const AllTasks = props => {
    const {taskTotal, type, userIdentify, userId, courseResource, courseTask, handleFetchTaskRes, handleFetchCourseRes, handleStudentAddCourse} = props;
    useEffect(()=>{
        console.log(userId);
        handleFetchCourseRes({page: 1, userId: userId});
    },[userId]);
//点击那个加号展开实验任务详情
    const expandedRowRender = record => {
        const columns = [
            { title: '实验任务', dataIndex: 'taskName', key: 'taskName' },
            { title: '任务附件', dataIndex: 'fileName', key: 'fileName' },
            { title: '发布时间', dataIndex: 'addTime', key: 'addTime' }
        ];
        const el = (
            <Table
                rowKey={record.id}
                columns={columns}
                dataSource={courseTask[record.teacherCourseId]}
                pagination={false}
            />
        );
        return el;
    };
    const columns = [
            { title: '实验课程', dataIndex: 'courseName', key: 'courseName' },
            { title: '教学班编号', dataIndex: 'courseId', key: 'courseId' },
            { title: '教学班备注', dataIndex: 'remark', key: 'remark' },
            { title: '课程编号', dataIndex: 'courseNumber', key: 'courseNumber' },
            { title: '课程教师', dataIndex: 'teacherName', key: 'teacherName' },
            { title: '发布时间', dataIndex: 'addTime', key: 'addTime' },
            userIdentify === "学生"
                ?
                {
                    title: '实验处理',
                    key: 'handleTask',
                    render: (e) => (
                        <span
                            onClick={() =>(
                                    handleStudentAddCourse({
                                        teacherCourseId: e.teacherCourseId,
                                        userId: userId,
                                        type: type
                                    })
                            )}
                            style={{color: "#189EFF", cursor: "pointer"}}
                        >
                        {
                            userIdentify === "学生" ?
                                e.added ? "已添加" : "添加课程"
                                :
                                null
                        }
                    </span>
                    )
                } : {}
        ];

    return (
        <div id="taskWrap">
            <SearchCourse/>
            <Table
                rowKey={record => record.id}
                columns={columns}
                expandedRowRender={(record)=>(expandedRowRender(record))}
                onExpand = {
                    (expanded,record)=>{
                        expanded && handleFetchTaskRes({teacherCourseId: record.teacherCourseId, courseTask});
                    }
                }
                dataSource={courseResource}
                pagination={{
                    total: taskTotal,
                    onChange: e => handleFetchCourseRes({ page: e, userId: userId }),
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
        userIdentify: state.getIn(["userMana", "common", "userIdentify"]),
        userId: state.getIn(["userMana", "common", "userId"]),
        type: state.getIn(["userMana", "common", "type"]),
        addCourse_S : state.getIn((["course", "addCourse_S"]))
    }),
    dispatch => ({
        handleFetchCourseRes(args){
            dispatch(course.fetchCourse(args));
        },
        handleFetchTaskRes(teacherCourseId,courseTask){
            dispatch(course.fetchCourseTask(teacherCourseId, courseTask));
        },
        handleStudentAddCourse(args){
            dispatch(course.studentAddCourse(args));
        },
    })
)(AllTasks);