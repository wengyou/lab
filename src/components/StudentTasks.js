import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Table, Modal, Button, Upload, message, Alert } from "antd";
import * as course from "../redux/actionCreators/resource";
const { confirm } = Modal;

//学生的"我的任务"
const StudentTasks = props => {
    const {
        type, userId, courseTask, myCourse,checkList, studentUploadFlag,param,
        handleMyCourseRes, handleFetchTaskRes, handleStudentDeleteCourse,
        handleStudentUploadWork, handleStudentQuerySubmit, handleStudentDeleteHomework
    } = props;
    const [uploadVisible, setUploadVisible] = useState(false);
    const [checkWorkVisible, setCheckWorkVisible] = useState(false);
    const [studentCourseId, setStudentCourseId] = useState("");
    const [taskId, setTaskId] = useState("");
    const [fileList, setFileList] = useState([]);
    const [uploadLoading, setUploadLoading] = useState(false);

    useEffect(()=>{
        handleMyCourseRes({ userId: userId, type:type })
    },[]);
    useEffect(()=>{
        setUploadVisible(false);
        setUploadLoading(false)
    },[studentUploadFlag]);
    //学生删除课程/任务提示框
    const deleteConfirm = (e, action) => {
        confirm({
            title: "请确认~",
            content: "删除后不可恢复，确认删除吗？",
            onOk() {
                action === "deleteCourse" ?
                    handleStudentDeleteCourse({
                        studentCourseId: e.studentCourseId,
                        userId: userId,
                        teacherCourseId: e.teacherCourseId
                    })
                    :
                    handleStudentDeleteHomework({
                        userId: userId,
                        workId: e.id,
                    });
                },
            onCancel() {}
        })
    };
    //学生上传作业
    const studentUploadWork = () => {
            if (fileList.length === 0) {
                message.error("请选择文件！");
                setUploadLoading(false)
            } else {
                handleStudentUploadWork({
                    studentCourseId: studentCourseId,
                    taskId: taskId,
                    userId: userId,
                    file: fileList,
                });
                setFileList([])
            }
        }
    //点击那个加号展开实验任务详情
    const expandedRowRender = record => {
        const columns = [
            { title: '实验任务', dataIndex: 'taskName', key: 'taskName' },
            {
                title: '任务附件',
                key: 'taskFileName',
                align: 'center',
                render: e => (
                    <a download={""} href = {e.url}>{e.taskFileName}</a>
                )
            },
            { title: '发布时间', dataIndex: 'addTime', align: 'center', key: 'addTime' },
            {
                title: '作业处理',
                key: "handleHomework",
                align: "center",
                render: e => (
                    <div>
                        <span
                            style={{color: "#189EFF", cursor: "pointer", padding: "0 0.375rem"}}
                            onClick={
                                    () => {
                                        e.closed ?
                                            Modal.error({
                                                title: 'Attention!',
                                                content: '老师已关闭该任务作业的上传',
                                            }):
                                    setUploadVisible(!uploadVisible);
                                    setStudentCourseId(record.studentCourseId);
                                    setTaskId(e.id);
                                }
                            }

                        >
                            上传作业
                        </span>
                        <span
                            style={{color: "#189EFF", cursor: "pointer", padding: "0 0.375rem"}}
                            onClick={() => {
                                setCheckWorkVisible(!checkWorkVisible);
                                handleStudentQuerySubmit({
                                    taskId: e.id,
                                    userId: userId,
                                })
                            }}
                        >
                            查看作业
                        </span>
                    </div>
                )
            }
        ];
        const el = (
            <>
                <Table
                    size={'small'}
                    rowKey={(record)=>(record.id)}
                    columns={columns}
                    dataSource={courseTask[record.teacherCourseId]}
                    pagination={false}
                />
            </>
        );
        return el;
    };
    //主列表
    const columns = [
        { title: '实验课程', dataIndex: 'courseName', key: 'courseName' },
        { title: '教学班备注', dataIndex: 'remark', align: 'center', key: 'remark' },
        { title: '课程编号', dataIndex: 'teacherCourseId', align: 'center', key: 'teacherCourseId' },
        { title: '实验教师', dataIndex: 'teacherName', align: 'center', key: 'teacherName' },
        { title: '选课时间', dataIndex: 'addTime', align: 'center', key: 'addTime' },
        {
            title: '课程处理',
            align: 'center',
            render: (e)=>(
                <span
                    onClick={()=>deleteConfirm(e, "deleteCourse")}
                    style={{color: "#B30000", cursor: "pointer"}}
                >
                    删除任务
                </span>
            )
        }
    ];

    const uploadProps = {
                beforeUpload:
                    file => {
                        fileList.push(file);
                        return false
                    },
                onRemove:
                    file=>{
                        const index = fileList.indexOf(file.originFileObj);
                        fileList.splice(index, 1);
                    }
            };

    return (
            <div>
                <Table
                    rowKey={record => record.teacherCourseId}
                    size={'small'}
                    columns={columns}
                    expandedRowRender={(record)=>expandedRowRender(record)}
                    onExpand = {
                        (expanded,record)=>{
                            expanded && handleFetchTaskRes({teacherCourseId: record.teacherCourseId, courseTask});
                        }
                    }
                    dataSource={[...myCourse]}
                    pagination={false}
                />
                <Modal
                    title = {"上传作业"}
                    visible = {uploadVisible}
                    footer={
                        <Button
                            loading={uploadLoading}
                            type = "primary"
                            onClick={()=>{
                                studentUploadWork();
                                setUploadLoading(!uploadLoading)
                            }}
                        >
                            上传文件
                        </Button>
                    }
                    destroyOnClose = {true}
                    onCancel={() => {
                        setUploadVisible(!uploadVisible);
                        setUploadLoading(false);

                    }}
                >
                    <div>
                        <Alert type='info' showIcon message={
                            <div>
                                <div>只能上传大小不超过<span className="fontC_red">{Array.isArray(param) && param[4].keyValue + 'M'}</span>的文件，且同名文件将会覆盖</div>
                                <div>可以拖动鼠标或者按住ctrl键选择多个文件上传</div>
                            </div>
                        } />
                        <div className='padding_column_xs'>
                            <Upload
                            {...uploadProps}
                            multiple = {true}
                        >
                            <Button>选择文件</Button>
                        </Upload>
                        </div>

                    </div>
                </Modal>
                <Modal
                    title = {"查看作业"}
                    visible = {checkWorkVisible}
                    footer={null}
                    onCancel={() => {
                        setCheckWorkVisible(!checkWorkVisible)
                    }}
                >
                    <div>
                        <Table
                        rowKey={e=> (e.id)}
                        pagination={false}
                        scroll={{y: "17.5rem"}}
                        size = "small"
                        dataSource={[...checkList]}
                        columns={[
                            {title: "作业名称", dataIndex: "workName", key: "workName", width: "55%"},
                            {title: "上传时间", dataIndex: "addTime", align: 'center', key: "addTime",},
                            {
                                title: "作业操作",
                                key: "handleWork",
                                align: 'center',
                                render: (e) => (
                                    <>
                                        <a
                                            download={""}
                                            href={e.url}
                                            style={{color: "#189EFF", cursor: "pointer"}}
                                        >
                                            下载
                                        </a>
                                        <span
                                            onClick={() => deleteConfirm(e, "deleteHomework")}
                                            style={{color: "#B30000", cursor: "pointer", padding: "0 0.375rem"}}
                                        >
                                            删除
                                        </span>
                                    </>
                                )
                            },
                        ]}
                    />
                        <div className="fontS_12 padding_column_xxs fontC_red" >请注意！上传的作业将于每年8月1日清空，请及时备份</div>
                    </div>

                </Modal>
            </div>
    )
};
export default connect(
    state => ({
        userId: state.getIn(["userMana", "common", "userId"]),
        type: state.getIn(["userMana", "common", "type"]),
        myCourse: state.getIn(["course", "myCourse"]),
        courseTask: state.getIn(["course", "courseTask"]),
        checkList: state.getIn(["course", "checkList"]),
        studentUploadFlag: state.getIn(["course", "studentUploadFlag"]),
        param: state.getIn(["userMana", "common", "param"])
    }),
    dispatch => ({
        handleMyCourseRes(args){
            dispatch(course.queryMyCourse(args));
        },
        handleFetchTaskRes(teacherCourseId,courseTask){
            dispatch(course.fetchCourseTask(teacherCourseId, courseTask));
        },
        handleStudentDeleteCourse(args){
            dispatch(course.studentDeleteCourse(args))
        },
        handleStudentQuerySubmit(args){
            dispatch(course.studentQuerySubmit(args))
        },
        handleStudentUploadWork(args){
            dispatch(course.studentUploadHomework(args))
        },
        handleStudentDeleteHomework(args){
            dispatch(course.studentDeleteHomework(args))
        }

    })
)(StudentTasks);
