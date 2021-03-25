
import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import { Table, Modal, Input, Button, Icon, Upload, message } from "antd";
import * as course from "../../../redux/actionCreators/resource";
import { export_json_to_excel2 } from "../../../lib/Export2Excel";
import AllCourse from "../../../components/AllCourse";
import AddStudents from "../../../components/addStudents";

const { confirm } = Modal;
//教师任务的第一个
const TeacherTasks = props => {
    const {
        type, userId, submitTotal, submitList,downloadUrl,unSubmitList,
        courseTask, myCourse, teacherUploadFlag, teacherUpdateFlag,
        handleAddRemark, handleMyCourseRes,studentCourseList,
        handleFetchTaskRes, handleTeacherDeleteCourse,
        handleTeacherReleaseTask, handleTeacherDeleteTask,
        handleToggleUpload, handleTeacherQuerySubmit,
        handleTeacherQueryUnsubmit,handleTeacherUpdateTask,
        handleTeacherDownloadSubmit,handleDeleteStudentCourse,
        handleCheckStudent,
    } = props;
    const [ releaseVisible, setReleaseVisible ] = useState(false);
    const [ remarkVisible, setRemarkVisible ] = useState(false);
    const [ textVisible, setTextVisible ] = useState(true);
    const [ updateVisible, setUpdateVisible ] = useState(false);
    const [ unSubmitVisible, setUnSubmitVisible ] = useState(false);
    const [ submitVisible, setSubmitVisible ] = useState(false);
    const [ downloadVisible, setDownloadVisible ] = useState(false);
    const [ checkStudentVisible, setCheckStudentVisible ] = useState(false);
    const [ addCourseVisible, setAddCourseVisible ] = useState(false);
    const [ addStudentVisible, setAddStudentVisible ] = useState(false);
    const [teacherCourseId, setTeacherCourseId] = useState("");
    const [taskName, setTaskName] = useState("");
    const [taskId, setTaskId] = useState();
    const [userIdList, setUserIdList] = useState('');
    const [updateName, setUpdateName] = useState("");
    const [ remark, setRemark ] = useState("");
    const [files, setFiles] = useState([]);
    const [updateFiles,setUpdateFiles] = useState([]);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [uploadBtn, setUploadBtn] = useState(false);
    const [updateBtn, setUpdateBtn] = useState(false);
    const [checkSubmit, setCheckSubmit] = useState({page: 1, rows: 10});
    useEffect(()=>{
        handleMyCourseRes({ userId: userId, type:type })
    },[]);
    useEffect(()=>{
        setReleaseVisible(false);
        setUploadLoading(false);
        setUploadBtn(false);
    },[teacherUploadFlag]);
    useEffect(()=>{
        setUpdateVisible(false);
        setUpdateLoading(false);
        setUpdateBtn(false);
    },[teacherUpdateFlag]);

    //删除课程或任务时弹出的确认框
    const deleteConfirm = (e, action) => {
        confirm({
            title: "请确认~",
            content: action === 'deleteTask' ? '删除将会移除所有学生作业，无法撤销，您确定吗？' : '删除该实验课程，会删除和该课程相关的作业及实验任务附件，您确定吗？',
            onOk() {
                action === "deleteTask" ?
                        handleTeacherDeleteTask({
                            taskId: e.id,
                            teacherCourseId: e.teacherCourseId
                        })
                    :
                        handleTeacherDeleteCourse({
                            id: e.teacherCourseId,
                            userId: userId,
                            courseId:e.courseId
                        })
            },
            onCancel() {}
        })
    };
    //实现手动上传文件后发布任务
    const handleUpload = () => {
        if(taskName && taskName.trim().length !== 0){
            handleTeacherReleaseTask(
                files.length > 0 ?
                {
                    teacherCourseId: teacherCourseId,
                    userId: userId,
                    taskName: taskName,
                    file: files[0],
                    courseTask: courseTask
                }
            :
                    {
                        teacherCourseId: teacherCourseId,
                        userId: userId,
                        taskName: taskName,
                        file: "",
                        courseTask: courseTask
                    }
            );
            setTaskName("");
            setFiles([]);
        } else {
            message.error("任务名不能为空哦！");
            setUploadLoading(false);
        }
    };
    // 更新任务
    const handleUpdate = () => {
        if(updateName && updateName.trim().length !== 0){
            handleTeacherUpdateTask({
                id: taskId,
                taskName: updateName,
                file: updateFiles[0],
                teacherCourseId: teacherCourseId,
                userId: userId
            });
            setUpdateFiles([]);
            setTaskName("");
        }
        else{
            message.error("任务名不能为空哦！");
            setUpdateLoading(false);


        }
    };
    //添加/修改教学班备注
    const addRemark = () =>{
        handleAddRemark({
            teacherCourseId: teacherCourseId,
            remark: remark,
        });
        setTimeout(()=>{
            setRemarkVisible(!remarkVisible);
            setRemark("");
        }, 1000 );
    };
    //点击那个加号展开实验任务详情
    const expandedRowRender = record => {
        const columns = [
            { title: '任务名称', width: "18%", dataIndex: 'taskName', key: 'taskName', align: 'center' },
            {
                title: '任务附件',
                key: 'taskFileName',
                align: 'center',
                width: "18%",
                render: e => (
                    <a download={""} href = {e.url}>{e.taskFileName}</a>
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
                            style={{color: "#189EFF", cursor: "pointer", padding: "0 0.375rem"}}
                            onClick={() => checkWorks(e)}
                        >
                            查看作业
                        </span>
                        <span
                            onClick={()=>{
                                handleToggleUpload({
                                    taskId: e.id,
                                    teacherCourseId: e.teacherCourseId,
                                })
                            }}
                            style={{color: e.closed ? "darkBlue" : "#B30000", cursor: "pointer", padding: "0 0.375rem"}}
                        >
                            {
                                e.closed ? "开启作业提交" : "关闭作业提交"
                            }
                        </span>
                        <span
                            style={{color: "#189EFF", cursor: "pointer", padding: "0 0.375rem"}}
                            onClick={()=>{
                                setUnSubmitVisible(!unSubmitVisible);
                                handleTeacherQueryUnsubmit({
                                    teacherCourseId: e.teacherCourseId,
                                    taskId: e.id,
                                });
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
                                setUpdateVisible(!updateVisible);
                                setUpdateName(e.taskName);
                                setTaskId(e.id);
                                setTeacherCourseId(e.teacherCourseId);
                            }
                        }
                        style = {{color: "#189EFF", cursor: "pointer"}}
                    >
                        修改任务
                    </span>
                        <span
                            onClick={()=>deleteConfirm(e, "deleteTask")}
                            style={{color: "#B30000", cursor: "pointer", padding: "0 0.375rem"}}
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
                    size={'small'}
                    rowKey={e => (e.id)}
                    columns={columns}
                    dataSource={courseTask[record.teacherCourseId]}
                    pagination={false}
                />
            </>
        );
        return el;
    };
    //删除学生
    const deleteStudent = (e) => {
        confirm({
            title: '将删除学生上传到该任务的所有作业，请下载该学生的作业备份再删除',
            onOk(){
                handleDeleteStudentCourse({
                    studentCourseIdList: e.studentCourseId,
                });
            },
            onCancel(){
            }
        })
    }
    //导出学生
    const exportStudent = () => {
        const tHeader = ['学生姓名', '学号']
        const filterVal = ['userName', 'userId']
        export_json_to_excel2(tHeader, studentCourseList, filterVal, '选课学生信息')
    }
    //下载作业
    const downloadWorks = (type) =>{
        if(type === 'part'){
            if(userIdList.length !== 0) {
                const hide = message.loading('文件正在打包中，请耐心等待～', 0);
                handleTeacherDownloadSubmit({
                    userIdList: userIdList,
                    taskId: taskId,
                    callback: e => (setDownloadVisible(e)),
                    hide: hide
                });
            } else {
                message.error('您还没有选择要下载的作业哦～')
            }
        } else if(type === 'all') {
            const hide = message.loading('若文件体积过大，可能需要较长时间哦，请耐心等待～', 0);
            handleTeacherDownloadSubmit({
                userIdList: '',
                taskId: taskId,
                callback: e => (setDownloadVisible(e)),
                hide:hide
            });
        }
        }
    //查看学生作业
    const checkWorks = (e)=>{
        setUserIdList('');
        setCheckSubmit(
            {
                ...checkSubmit,
                taskId: e.id
            }
        )
        handleTeacherQuerySubmit({
            ...checkSubmit,
            taskId: e.id
        });
        setSubmitVisible(true);
        setTaskId(e.id);
    }
    //查看学生作业中的翻页
    const changePage = (e) => {
        setCheckSubmit(
            {
                ...checkSubmit,
                page: e
            }
        )
        handleTeacherQuerySubmit({
            ...checkSubmit,
            page: e
        })

    }
    //改变学生作业中每页显示数量
    const onShowSizeChange = (current, pageSize) => {
        setCheckSubmit(
            {
                ...checkSubmit,
                page: 1,
                rows: pageSize
            }
        )
        handleTeacherQuerySubmit({
            ...checkSubmit,
            page: 1,
            rows: pageSize
        })
    }


    const columns = [
        { title: '实验课程', dataIndex: 'courseName', key: 'courseName',align: 'center', },
        { title: '教学班编号', dataIndex: 'teacherCourseId', key: 'teacherCourseId', align: 'center', },
        {
            title: '教学班备注',
            key: 'remark',
            align: 'center',
            render: e => (
                <div
                    onClick = {
                        ()=>{
                            setTeacherCourseId(e.teacherCourseId);
                            setRemarkVisible(!remarkVisible);
                            setRemark(e.remark);
                        }
                    }
                    style={{color: e.remark ? "#F0BB04" :"#189EFF", cursor: "pointer"}}
                >{
                    e.remark ?
                        <div><span className="padding_row_xxs" style={{color: 'rgba(0, 0, 0, 0.65)'}}>{e.remark.length > 10 ? e.remark.substr(0, 10) + '...' : e.remark}</span>修改</div>
                        :
                        <div>添加</div>
                }
                </div>
            )
        },
        { title: '课程编号', dataIndex: 'courseNumber', key: 'courseNumber', align: 'center', },
        { title: '添加时间', dataIndex: 'addTime', key: 'addTime', align: 'center', },
        {
            title: '课程处理',
            key: "dealCourse",
            align: 'center',
            render: (e)=>(
                <div>
                    <span
                        onClick={
                            ()=>{
                                setTeacherCourseId(e.teacherCourseId);
                                setReleaseVisible(true);
                            }
                        }
                        style={{color: "#189EFF", cursor: "pointer"}}
                    >
                        发布任务
                    </span>
                    <span
                        onClick={()=>deleteConfirm(e, "deleteCourse")}
                        style={{color: "#B30000", cursor: "pointer", padding: "0 0.375rem"}}
                    >
                        删除课程
                    </span>
                    <span
                        onClick={()=>{
                            setTeacherCourseId(e.teacherCourseId);
                            handleCheckStudent({
                                teacherCourseId: e.teacherCourseId
                            });
                            setCheckStudentVisible(true);
                        }}
                        style={{color: "#F0BB04", cursor: "pointer", padding: "0 0.375rem"}}
                    >
                        学生信息
                    </span>
                </div>
            )
        }

    ];

    const releaseProps = {
        beforeUpload:
            file => {
                files.push(file);
                files.length > 0 ? setUploadBtn(true) : setUploadBtn(false);
                return false
            },
        onRemove:
            file=>{
                const index = files.indexOf(file.originFileObj);
                files.splice(index, 1);
                files.length > 0 ? setUploadBtn(true) : setUploadBtn(false);

            },
    };

    const updateProps = {
        beforeUpload:
            file => {
                updateFiles.push(file);
                updateFiles.length > 0 ? setUpdateBtn(true) : setUpdateBtn(false);
                return false
            },
        onRemove:
            file=>{
                const index = updateFiles.indexOf(file.originFileObj);
                updateFiles.splice(index, 1);
                updateFiles.length > 0 ? setUpdateBtn(true) : setUpdateBtn(false);

            }
    };

    return (
        <div>
            <Button onClick={() => {setAddCourseVisible(true)}} type='primary' className='margin_column_xxs' >
                <Icon type={'plus'} />
                添加
            </Button>
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
                width={'64rem'}
                title='添加课程'
                visible={addCourseVisible}
                footer={null}
                onCancel = {() => {
                    setAddCourseVisible(false);
                }}
            >
                <AllCourse />
            </Modal>
            <Modal
                title = "发布实验任务及上传附件"
                visible = {releaseVisible}
                onCancel={() => {
                    setReleaseVisible(false);
                    setUploadLoading(false);
                    setFiles([]);
                    setTaskName("");
                }}
                footer = {[
                    <Button
                        onClick={() => {
                            setReleaseVisible(!releaseVisible);
                            setUploadLoading(false);
                            setUploadBtn(false);
                            setFiles([]);
                            setTaskName("");
                        }}
                    >
                        取消
                    </Button>
                ]}
                destroyOnClose = {true}
            >
                <div style={{display: "flex", marginBottom: "0.75rem"}}>
                    <Input
                        style={{width: "75%"}}
                        value={taskName}
                        placeholder = {"请输入任务名称"}
                        onChange = {(e) =>{
                            setTaskName(e.target.value);
                        }}
                    />
                    <Button
                        style={{marginLeft: "0.75rem"}}
                        type = {"primary"}
                        loading = {uploadLoading}
                        onClick={()=> {
                            if(files.length <= 1){
                                setUploadLoading(true);
                                handleUpload();
                            }else{
                                message.error("只能上传一个附件!");
                            }
                        }}
                    >
                        发布任务
                    </Button>
                </div>
                <div>
                    <div style={{display: "flex", alignItems: "center"}} >
                        <Upload
                            {...releaseProps}
                        >
                            <Button
                                disabled={uploadBtn}
                                onClick={()=>(setTextVisible(false))}
                                style={{marginRight: "0.625rem"}}
                            >
                                <Icon type = "upload"/>
                                选择文件
                            </Button>
                        </Upload>
                        <p style={{ display: textVisible ? "" : "none" }}>{textVisible ? '(注：上传的文件将覆盖原有文件！)' : '可不上传文件直接发布任务'}</p>
                    </div>
                    <div className="fontC_red fontS_12 padding_column_xxs">发布的任务和上传到该任务的作业，将于每年8月1日清空，请老师及时备份。</div>
                </div>
        </Modal>

            <Modal
                rowKey = {e=>e.id}
                title = "修改任务"
                visible = {updateVisible}
                onCancel={() => {
                    setUpdateVisible(!updateVisible);
                    setUpdateLoading(false);
                    setUpdateBtn(false);
                    setUpdateFiles([]);
                }}
                footer = {[
                    <Button
                        disabled={updateBtn}
                        onClick={() => {
                            setUpdateVisible(!updateVisible);
                            setUpdateLoading(false);
                          }
                        }
                    >
                        取消
                    </Button>
                ]}
                destroyOnClose = {true}

            >
                <div style={{display: "flex", marginBottom: "0.75rem"}}>
                    <Input
                        style={{width: "75%"}}
                        value = {updateName}
                        onChange = {(e) =>{
                            setUpdateName(e.target.value);
                        }}
                    />
                    <Button
                        loading={updateLoading}
                        style={{marginLeft: "0.75rem"}}
                        type = {"primary"}
                        onClick={()=>{
                            setUpdateLoading(true);
                            handleUpdate();
                        }}
                    >
                        确认修改
                    </Button>
                </div>
                <div
                    style={{display: "flex", alignItems: "center"}}
                >
                    <Upload
                        {...updateProps}
                        showUploadList={true}
                        multiple = {true}
                    >
                        <Button
                            disabled={updateBtn}
                            onClick={()=>(setTextVisible(false))}
                            style={{marginRight: "0.625rem"}}
                        >
                            <Icon type = "upload"/>
                            选择文件
                        </Button>
                    </Upload>
                    <p style={{ display: textVisible ? "" : "none" }}>(注：可不上传文件直接发布任务~)</p>
                </div>
            </Modal>
            <Modal
                title = {`${remark ? "修改" : "添加"}备注`}
                visible={remarkVisible}
                footer = {null}
                onCancel={()=>setRemarkVisible(!remarkVisible)}
            >
                <div  style = {{display: "flex" }} >
                <Input
                    style={{marginRight: "0.8125rem"}}
                    placeholder={`${remark ? remark : "请输入内容（如：班级代码、专业等）"}`}
                    value={remark}
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
                    rowKey={e => (e.studentId)}
                    size = "small"
                    dataSource={[...unSubmitList]}
                    columns={[
                        { title: "学生姓名", dataIndex: "userName", key: "userName" },
                        { title: "学生学号", dataIndex: "userId", key: "userId" }
                    ]}
                    pagination={false}

                />

            </Modal>
            <Modal
                title = "选课学生信息"
                visible={checkStudentVisible}
                footer = {null}
                onCancel={() => { setCheckStudentVisible(false) }}
                footer = {[
                    <Button onClick={() => {setAddStudentVisible(true)}} >添加</Button>,
                    <Button type='primary' onClick={exportStudent} >导出</Button>
                ]}
            >
                <Table
                    rowKey={e => (e.userId)}
                    size={"small"}
                    dataSource = {[...studentCourseList]}
                    columns={[
                        { title: "学生姓名", dataIndex: "userName", key: "userName" },
                        { title: "学生学号", dataIndex: "userId", key: "userId" },
                        {
                            title: "操作",
                            key: "operate",
                            render: (e)=> (
                                <span
                                    onClick={()=>(deleteStudent(e))}
                                    style={{color: "#B30000", cursor: "pointer", padding: "0 0.375rem"}}
                                >
                                    删除
                                </span>
                            )
                        }
                    ]}
                    pagination={false}

                />

            </Modal>
            <Modal
                title={"请确认！"}
                width={"15rem"}
                visible={downloadVisible}
                footer = {
                    <a download="" href={downloadUrl}>
                        <Button type={"primary"} onClick={() => (setDownloadVisible(false))} >确定</Button>
                    </a>
                }
                onCancel={()=>(setDownloadVisible(!downloadVisible))}
            >
                点击确认按钮即可开始下载～
            </Modal>
            <Modal
                title={`已提交作业信息`}
                visible={submitVisible}
                width={"64rem"}
                onCancel = {()=>(setSubmitVisible(!submitVisible))}
                footer={null}
            >

                <Button
                    className='margin_row_xxs'
                    onClick={() => (downloadWorks('part'))}
                    type = {"primary"}
                    >
                    <Icon type = "download" />
                    选择下载
                </Button>
                <Button
                    onClick={() => (downloadWorks('all'))}
                    type = {"primary"}
                >
                    <Icon type = "download" />
                    全部下载
                </Button>
                <Table
                    rowKey={e => (e.id)}
                    pagination={{
                        current: checkSubmit.page,
                        total:submitTotal,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        onChange: changePage
                    }}
                    rowSelection ={{
                        onChange: (selectedRowKeys, selectedRows) => {
                            //setStartDownload(selectedRows);
                            let studentIdList = selectedRows.map((e)=>(
                                e.studentId
                            ));
                            let idList = Array.from(new Set(studentIdList));
                            setUserIdList(idList.join(";"));
                        },
                    }}
                    dataSource={[...submitList]}
                    columns={[
                        {title: "学生姓名", dataIndex: "userName", key: "userName"},
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

            </Modal>
            <AddStudents
                addStudentVisible={addStudentVisible}
                visibleCallback={(e) => (setAddStudentVisible(e))}
                teacherCourseId={teacherCourseId}
                />
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
        studentCourseList: state.getIn(["course", "studentCourseList"]),
        studentCourseTotal: state.getIn(["course","studentCourseTotal"]),
        teacherUploadFlag: state.getIn(["course", "teacherUploadFlag"]),
        teacherUpdateFlag: state.getIn(["course", "teacherUpdateFlag"]),
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
        handleTeacherDeleteTask(args){
            dispatch(course.teacherDeleteTask(args))
        },
        handleToggleUpload(args){
            dispatch(course.teacherToggleUpload(args));
        },
        handleTeacherQueryUnsubmit(args){
            dispatch(course.teacherQueryUnsubmit(args))
        },
        handleTeacherQuerySubmit(taskId){
            dispatch(course.teacherQuerySubmit(taskId))
        },
        handleTeacherDownloadSubmit(args){
            dispatch(course.teacherDownloadSubmit(args))
        },
        handleDeleteStudentCourse(args){
            dispatch(course.teacherDeleteStudent(args))
        },
        handleCheckStudent(args){
            dispatch(course.teacherCheckStudent(args));
        }
    })
)(TeacherTasks);
