import React, {useEffect} from "react";
import { connect } from "react-redux"
import {Table, Modal} from "antd";
import * as course from "../redux/actionCreators/resource";
//老师的上机任务显示的第二个界面
const AllCourse = props => {
    const { type, userId, courseTotal, allCourse, handleTeacherAddCourse, handleTeacherQueryCourse } = props;
    useEffect(()=>{
        handleTeacherQueryCourse({page: 1, userId: userId});
    },[userId]);

    const columns = [
        { title: '课程名', dataIndex: 'courseName', key: 'courseName' },
        { title: '课程编号', dataIndex: 'courseNumber', key: 'courseNumber' },
        { title: '发布时间', dataIndex: 'addTime', key: 'addTime' },
            {
                title: '课程处理',
                key: 'addTask',
                render: (e) => (
                    <span
                        onClick={() =>(
                            handleTeacherAddCourse({
                                courseId: e.id,
                                teacherId: userId,
                                type: type,
                            })
                        )}
                        style={{color: "#189EFF", cursor: "pointer"}}
                    >
                        {
                            e.added ? "已添加" : "添加课程"
                        }
                    </span>
                )
            }
    ];
    return (
        <Table
            rowKey={record => record.teacherCourseId}
            columns={columns}
            dataSource={allCourse}
            pagination={{
                total: courseTotal,
                onChange: e => handleTeacherQueryCourse({ page: e, userId: userId }),
            }}
        />
    )
};

export default connect(
    state => ({
        userId: state.getIn(["userMana", "common", "userId"]),
        courseTotal: state.getIn(["course", "courseTotal"]),
        allCourse: state.getIn(["course", "allCourse"]),
        type: state.getIn(["userMana", "common", "type"])
        
    }),
    dispatch => ({
        handleTeacherAddCourse(args){
            dispatch(course.teacherAddCourse(args));
        },
        handleTeacherQueryCourse(args){
            dispatch(course.teacherQueryCourse(args));
        }
    })
)
(AllCourse);