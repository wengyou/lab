import React, { useState } from "react";
import { connect } from 'react-redux';
import {Modal, Input, Select, Table} from "antd";
import { teacherAddStudent } from '../redux/actionCreators/resource';
import * as resource from "../redux/actionCreators/resource";

const { Search } = Input;
const { Option } = Select;

const AddStudents = (props) => {
    const [searchInfo, setSearchInfo] = useState({type: 'userId', page: 1, input: ''})

    const {
        studentMessage,
        total,
        teacherCourseId,
        visibleCallback,
        addStudentVisible,
        handleTeacherAddStudent,
        handleSearchStudent
    } = props;
    //改变option
    const handleSelect = (value) => {
        setSearchInfo({
            ...searchInfo,
            type: value
        })
    }
    //翻页
    const changePage = (page) => {
        setSearchInfo({
            ...searchInfo,
            page: page
        });
        handleSearchStudent({
            page: page,
            type: "student",
            userId: searchInfo.type === 'userId' ? searchInfo.input : '',
            userName: searchInfo.type === 'userName' ? searchInfo.input : ''
        })

    }
    //查询学生信息
    const search = (value) => {
        setSearchInfo({
            ...searchInfo,
            input: value
        })
        handleSearchStudent({
                    page: 1,
                    type: "student",
                    userId: searchInfo.type === 'userId' ? value : '',
                    userName: searchInfo.type === 'userName' ? value : ''
                })
    };

    //教师为学生添加课程
    const addCourse = (e) => {
        handleTeacherAddStudent(
            {
                userId: e.userId,
                teacherCourseId: teacherCourseId
            }
        )
    }

    const columns = [
        { title: "学生姓名", align: 'center', dataIndex: "userName", key: "userName" },
        { title: "学生学号", align: 'center', dataIndex: "userId", key: "userId" },
        {
            title: "操作",
            key: "operate",
            align: 'center',
            render: (e)=> (
                <span
                    onClick={()=>(addCourse(e))}
                    style={{color: 'rgb(24, 144, 255)' ,cursor: "pointer",}}
                >
                    添加
                </span>
            )
        }
    ]

    return (
        <Modal
            visible={addStudentVisible}
            onCancel={() => (visibleCallback(false))}
            footer={null}
        >
            <div style={{width: '17rem'}} className='flex margin_column_xs'>
                <Select
                    defaultValue='userId'
                    onChange={handleSelect}
                >
                    <Option value='userId'>学号</Option>
                    <Option value='userName'>姓名</Option>
                </Select>
                <Search
                    onSearch={search}
                    enterButton
                />
            </div>
            <Table
                dataSource={studentMessage}
                columns={columns}
                pagination={{
                    current: searchInfo.page,
                    total,
                    onChange: changePage
                }}
            />
        </Modal>
    )
};

export default connect(
    state => ({
        studentMessage: state.getIn(["resource", "resource", "studentMessage"]),
        total: state.getIn(["resource", "resource", "studentTotal"]),
        userId: state.getIn(["resource", "resource", "studentId"]),
        userName: state.getIn(["resource", "resource", "studentName"]),
        page: state.getIn(["resource", "resource", "page"]),

    }),
    dispatch => ({
        handleTeacherAddStudent(args){
            dispatch(teacherAddStudent(args))
        },
        handleSearchStudent(args){
            dispatch(resource.fetchStudentMes(args))
        }
    })
)(AddStudents)
