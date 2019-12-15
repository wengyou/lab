
import React, { useEffect, useState, createContext } from "react";
import { connect } from "react-redux";
import { Table, Modal, Input, Button, Icon, Upload, Drawer, message } from "antd";
import * as course from "../redux/actionCreators/resource";

const { confirm } = Modal;
const TeacherTasks = props => {
    const {
        type, userId, submitTotal, submitList,downloadUrl,
        courseTask, myCourse,
        handleAddRemark, handleMyCourseRes,
        handleFetchTaskRes, handleTeacherDeleteCourse,
        handleTeacherReleaseTask, handleTeacherDeleteTask,
        handleToggleUpload, handleTeacherQuerySubmit,
        handleTeacherQueryUnsubmit,handleTeacherUpdateTask,
        handleTeacherDownloadSubmit,
    } = props;
    const [ releaseVisible, setReleaseVisible ] = useState(false);
    const [ remarkVisible, setRemarkVisible ] = useState(false);
    const [ textVisible, setTextVisible ] = useState(true);
    const [ updateVisible, setUpdateVisible ] = useState(false);
    const [ unSubmitVisible, setUnSubmitVisible ] = useState(false);
    const [ submitVisible, setSubmitVisible ] = useState(false);
    const [ downloadVisible, setDownloadVisible ] = useState(false);
    const [teacherCourseId, setTeacherCourseId] = useState("");
    const [taskName, setTaskName] = useState("");
    const [taskId, setTaskId] = useState();
    const [userIdList, setUserIdList] = useState();
    const [updateName, setUpdateName] = useState("");
    const [ remark, setRemark ] = useState("");
    const [startDownload, setStartDownload] = useState(false);
    let files = [], updateFiles = [];
    useEffect(()=>{
        handleMyCourseRes({ userId: userId, type:type })

    },[]);

    //删除课程或任务时弹出的确认框
    const deleteConfirm = (e, action) => {
        confirm({
            title: "请确认~",
            content: `您确定要删除该实验${action === "deleteTask" ? "任务" : "课程"}吗?`,
            onOk() {
                action === "deleteTask" ?
                        handleTeacherDeleteTask({
                            taskId: e.id,
                        })
                    :
                        handleTeacherDeleteCourse({
                            id: e.teacherCourseId,
                            userId: userId
                        })
            },
            onCancel() {}
        })
    };
    //开启/关闭上传作业时弹出的确认框
    const toggleConfirm = e => {
        confirm({
            title: "请确认~",
            content: `您确定要${e.closed ? "开启" :"关闭" }该实验任务的上传吗?`,
            onOk() {
                handleToggleUpload({
                    taskId: e.id,
                })
            },
            onCancel() {}
        })

    };
    //实现手动上传文件后发布任务
    const handleUpload = () => {
        taskName ?
        handleTeacherReleaseTask({
            teacherCourseId: teacherCourseId,
            userId: userId,
            taskName: taskName,
            file: files[0],
        }) : message.error("任务名不能为空哦！");
    };
    const handleUpdate = () => {
        updateName ?
            handleTeacherUpdateTask({
                id: taskId,
                taskName: updateName,
                file: updateFiles[0],
            }) : message.error("任务名不能为空哦！");
    };

    //添加教学班备注
    const addRemark = () =>{
        remark ?
        handleAddRemark({
            teacherCourseId: teacherCourseId,
            remark: remark,
        }) : message.error("备注不能为空哦！");
    };
    //点击那个加号展开实验任务详情
    const expandedRowRender = record => {
        const columns = [
            { title: '任务名称', dataIndex: 'taskName', key: 'taskName', align: 'center' },
            {
                title: '任务附件',
                key: 'fileName',
                align: 'center',
                render: e => (
                    <a href = {e.url}>{e.fileName}</a>
                )
            },
            { title: '发布时间', dataIndex: 'addTime', key: 'addTime', align: 'center' },
            {
                title: '学生作业',
                key: 'studentWork',
                align: 'center',
                render: e => (
                    <div>
                        <span
                            style={{color: "#189EFF", cursor: "pointer", padding: "0 6px"}}
                            onClick={()=>{
                                handleTeacherQuerySubmit({
                                    taskId: e.id
                                });
                                setSubmitVisible(true);
                                setTaskId(e.id);
                            }}
                        >
                            查看作业
                        </span>
                        <span
                            onClick={()=>toggleConfirm(e)}
                            style={{color: e.closed ? "darkBlue" : "#B30000", cursor: "pointer", padding: "0 6px"}}
                        >
                            {
                                e.closed ? "开启作业提交" : "关闭作业提交"
                            }
                        </span>
                        <span
                            style={{color: "#189EFF", cursor: "pointer", padding: "0 6px"}}
                            onClick={()=>{
                                console.log(e);
                                setUnSubmitVisible(!unSubmitVisible);
                                handleTeacherQueryUnsubmit({
                                    teacherCourseId: e.teacherCourseId,
                                    taskId: e.id,
                                })
                            }}
                        >
                            未提交名单
                        </span>
                    </div>
                )
            },
            {
                title: '任务处理',
                key: "dealTask",
                align: 'center',
                render: (e)=>(
                    <div>
                    <span
                        onClick = {
                            () => {
                                console.log(e);
                                setUpdateVisible(!updateVisible);
                                setTextVisible(true);
                                setUpdateName(e.taskName);
                                setTaskId(e.id);
                            }
                        }
                        style = {{color: "#189EFF", cursor: "pointer"}}
                    >
                        修改任务
                    </span>
                        <span
                            onClick={()=>deleteConfirm(e, "deleteTask")}
                            style={{color: "#B30000", cursor: "pointer", padding: "0 6px"}}
                        >
                        删除任务
                        </span>
                    </div>
                )
            }
        ];
        const el = (
            <>
                <Table
                    rowKey={record.id}
                    columns={columns}
                    dataSource={courseTask[record.teacherCourseId]}
                    pagination={false}
                />
            </>
        );
        return el;
    };


    const columns = [
        { title: '实验课程', dataIndex: 'courseName', key: 'courseName',align: 'center', },
        { title: '教学班编号', dataIndex: 'courseId', key: 'courseId', align: 'center', },
        {
            title: '教学班备注',
            key: 'remark',
            align: 'center',
            render: e => (
                <span
                    onClick = {
                        ()=>{
                            setTeacherCourseId(e.teacherCourseId);
                            setRemarkVisible(!remarkVisible);
                        }
                    }
                    style={{color: "#189EFF", cursor: "pointer"}}
                >{
                    e.remark ? e.remark : "添加"
                }
                </span>
            )
        },
        { title: '课程编号', dataIndex: 'courseNumber', key: 'courseNumber', align: 'center', },
        { title: '选课时间', dataIndex: 'addTime', key: 'addTime', align: 'center', },
        {
            title: '课程处理',
            key: "dealCourse",
            align: 'center',
            render: (e)=>(
                <div>
                    <span
                        onClick={
                            ()=>{
                                console.log(e);
                                setTeacherCourseId(e.teacherCourseId);
                                setReleaseVisible(!releaseVisible);
                                setTextVisible(true);
                            }
                        }
                        style={{color: "#189EFF", cursor: "pointer"}}
                    >
                        发布任务
                    </span>
                    <span
                        onClick={()=>deleteConfirm(e, "deleteCourse")}
                        style={{color: "#B30000", cursor: "pointer", padding: "0 6px"}}
                    >
                        删除课程
                    </span>
                </div>
            )
        }

    ];
    return (
        <div>
            <Table
                rowKey={record => record.id}
                columns={columns}
                expandedRowRender={(record)=>expandedRowRender(record)}
                onExpand = {
                    (expanded,record)=>{
                        //任务详情
                        expanded && handleFetchTaskRes({teacherCourseId: record.teacherCourseId, courseTask});
                    }
                }
                dataSource={myCourse}
                pagination={false}
            />

            <Modal
            title = "上传实验任务附件"
            visible = {releaseVisible}
            onCancel={() => setReleaseVisible(!releaseVisible)}
            footer = {[
                <Button
                    onClick={() => setReleaseVisible(!releaseVisible)}
                >
                    取消
                </Button>
            ]}
        >
            <div style={{display: "flex", marginBottom: "12px"}}>
                <Input
                    style={{width: "75%"}}
                    placeholder = {"请输入任务名称"}
                    onChange = {(e) =>{
                        setTaskName(e.target.value);
                    }}
                />
                <Button
                    style={{marginLeft: "12px"}}
                    type = {"primary"}
                    onClick={()=>(
                        files.length <= 1 ?
                        handleUpload() :
                            message.error("只能上传一个附件")
                    )
                    }
                >
                    发布任务
                </Button>
            </div>
            <div
                style={{display: "flex", alignItems: "center"}}
            >
                <Upload
                    beforeUpload={
                        file => {
                            files.push(file);
                            return false
                        }
                    }
                    onRemove={
                        file => {
                            const index = files.indexOf(file);
                            const testFile = files.slice();
                            console.log(index,testFile);
                            files.splice(index, 1)
                        }
                    }
                >
                    <Button
                        onClick={()=>(setTextVisible(false))}
                        style={{marginRight: "10px"}}
                    >
                        <Icon type = "upload"/>
                        选择文件
                    </Button>
                </Upload>
                <p style={{ display: textVisible ? "" : "none" }}>(注：可不上传文件直接修改任务~)</p>
            </div>
        </Modal>

            <Modal
                title = "修改任务"
                visible = {updateVisible}
                onCancel={() => setUpdateVisible(!updateVisible)}
                footer = {[
                    <Button
                        onClick={() => setUpdateVisible(!updateVisible)}
                    >
                        取消
                    </Button>
                ]}
            >
                <div style={{display: "flex", marginBottom: "12px"}}>
                    <Input
                        style={{width: "75%"}}
                        value = {updateName}
                        onChange = {(e) =>{
                            console.log(e.target.value);
                            setUpdateName(e.target.value);
                        }}
                    />
                    <Button
                        style={{marginLeft: "12px"}}
                        type = {"primary"}
                        onClick={()=>handleUpdate()}
                    >
                        确认修改
                    </Button>
                </div>
                <div
                    style={{display: "flex", alignItems: "center"}}
                >
                    <Upload
                        onRemove={
                            file => {
                                const index = updateFiles.indexOf(file);
                                console.log(index);
                                updateFiles.splice(0, 1)
                            }
                        }
                        beforeUpload={
                            file => {
                                updateFiles.push(file);
                                return false
                            }
                        }
                    >
                        <Button
                            onClick={()=>(setTextVisible(false))}
                            style={{marginRight: "10px"}}
                        >
                            <Icon type = "upload"/>
                            选择文件
                        </Button>
                    </Upload>
                    <p style={{ display: textVisible ? "" : "none" }}>(注：可不上传文件直接发布任务~)</p>
                </div>
            </Modal>
            <Modal
                title = {`添加备注`}
                visible={remarkVisible}
                footer = {null}
                onCancel={()=>setRemarkVisible(!remarkVisible)}
            >
                <div  style = {{display: "flex" }} >
                <Input
                    style={{marginRight: "13px"}}
                    placeholder={"请输入备注内容~"}
                    onChange = {(e) =>{
                        setRemark(e.target.value);
                    }}
                />
                <Button
                    type={"primary"}
                    onClick={()=>addRemark()}
                >
                    确认
                </Button>
                </div>
            </Modal>
            <Modal
                title = "未提交作业名单"
                visible={unSubmitVisible}
                footer = {null}
                onCancel={() => { setUnSubmitVisible(!unSubmitVisible) }}
            >
                <Table
                    size = "small"
                    columns={[
                        { title: "学生姓名", dataIndex: "userName", key: "userName" },
                        { title: "学生学号", dataIndex: "studentId", key: "studentId" }
                    ]}
                    pagination={false}

                />

            </Modal>
            <Modal
                title={"请确认！"}
                width={"200px"}
                visible={downloadVisible}
                footer = {
                    <a href={downloadUrl}>
                        <Button
                            type={"primary"}>确定</Button>
                    </a>
                }
                onCancel={()=>(setDownloadVisible(!downloadVisible))}
            >
                您确认下载吗？
            </Modal>
            <Drawer
                title={`已提交作业信息`}
                visible={submitVisible}
                width={"1024px"}
                onClose = {()=>(setSubmitVisible(!submitVisible))}
            >
                <Button
                    onClick={()=>{
                        setDownloadVisible(true);
                        handleTeacherDownloadSubmit({
                            userIdList: userIdList,
                            taskId: taskId
                        })
                    }}
                    type = {"primary"
                    }>
                    <Icon type = "download" />
                    下载
                </Button>
                <Table
                    pagination={{
                        total:submitTotal
                    }}
                    rowSelection ={{
                        onChange: (selectedRowKeys, selectedRows) => {
                            let idList = selectedRows.map((e)=>(
                                e.id
                            ));

                            setUserIdList(idList.join(";"));

                        },
                    }}
                    dataSource={submitList}
                    columns={[
                        {title: "学生姓名", dataIndex: "name", key: "name"},
                        {title: "学号", dataIndex: "studentId", key: "studentId"},
                        {
                            title: "作业名称",
                            key: "workName",
                            render: (e)=>(
                                <a href={e.url}>{e.workName}</a>
                            )
                        },
                        {title: "上传时间", dataIndex: "addTime", key: "addTime"}]
                    }
                />

            </Drawer>
        </div>
    )
};

export default connect(
    state => ({
        userId: state.getIn(["userMana", "common", "userId"]),
        type: state.getIn(["userMana", "common", "type"]),
        myCourse: state.getIn(["course", "myCourse"]),
        courseTask: state.getIn(["course", "courseTask"]),
        unSubmitList: state.getIn(["course", "unsubmitList"]),
        submitList: state.getIn(["course", "submitList"]),
        submitTotal: state.getIn(["course", "submitTotal"]),
        downloadUrl: state.getIn(["course", "downloadUrl"]),
    }) ,
    dispatch => ({
        handleMyCourseRes(args){
            dispatch(course.queryMyCourse(args));
        },
        handleFetchTaskRes(teacherCourseId,courseTask){
            dispatch(course.fetchCourseTask(teacherCourseId, courseTask));
        },
        handleTeacherDeleteCourse(args){
            dispatch(course.teacherDeleteCourse(args))
        },
        handleTeacherReleaseTask(args){
            dispatch(course.teacherReleaseTask(args))
        },
        handleTeacherUpdateTask(args){
            dispatch(course.teacherUpdateTask(args))
        },
        handleAddRemark(args){
            dispatch(course.teacherAddRemark(args))
        },
        handleTeacherDeleteTask(taskId){
            dispatch(course.teacherDeleteTask(taskId))
        },
        handleToggleUpload(taskId){
            dispatch(course.teacherToggleUpload(taskId));
        },
        handleTeacherQueryUnsubmit(args){
            dispatch(course.teacherQueryUnsubmit(args))
        },
        handleTeacherQuerySubmit(taskId){
            dispatch(course.teacherQuerySubmit(taskId))
        },
        handleTeacherDownloadSubmit(args){
            dispatch(course.teacherDownloadSubmit(args))
        }
    })
)(TeacherTasks);