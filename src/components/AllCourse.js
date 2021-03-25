import React, {useEffect, useState} from "react";
import { connect } from "react-redux"
import {Table, Input} from "antd";
import * as course from "../redux/actionCreators/resource";
//老师的上机任务显示的第二个界面

const { Search } = Input;

const AllCourse = props => {
    const { type, userId, courseTotal, allCourse, handleTeacherAddCourse, handleTeacherQueryCourse } = props;
    useEffect(()=>{
        handleTeacherQueryCourse({page: 1, userId: userId, courseName: ''});
    },[userId]);
    const [args, setArgs] = useState({page: 1, courseName: '', userId});

    const columns = [
        { title: '课程名', dataIndex: 'courseName', key: 'courseName' },
        { title: '课程编号', dataIndex: 'courseNumber', align: 'center', key: 'courseNumber' },
        { title: '发布时间', dataIndex: 'addTime',  align: 'center', key: 'addTime' },
            {
                title: '课程处理',
                key: 'addTask',
                align: 'center',
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
                        添加课程
                    </span>
                )
            }
    ];
    //搜索
    const handleSearch = (value) => {
        setArgs({
            ...args,
            page: 1,
            courseName: value
        })
        handleTeacherQueryCourse({
            ...args,
            page: 1,
            courseName: value
        })
    }
    //翻页
    const changePage = (page) => {
        setArgs({
            ...args,
            page: page
        })
        handleTeacherQueryCourse({
            ...args,
            page: page
        })
    }

    return (
        <div>
            <div className="margin_column_xxs" style={{width: '15rem'}}>
                <Search
                    enterButton
                    onSearch={handleSearch}
                />
            </div>
            <Table
                width={1024}
                size={'small'}
                rowKey={record => record.id}
                columns={columns}
                dataSource={[...allCourse]}
                pagination={{
                    current: args.page,
                    total: courseTotal,
                    onChange:changePage
                }}
            />
        </div>
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
