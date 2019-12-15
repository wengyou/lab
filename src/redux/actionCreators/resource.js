import * as constants from "../../constants/actionTypes";
//获取学习资料
export const fetchStudyResource = args => ({
    type: constants.FETCH_STUDY_RESOURCE,
    args
});
//获取软件资源
export const fetchSoftwareResource = args => ({
    type: constants.FETCH_SOFTWARE_RESOURCE,
    args
});
//上传学习资料
export const fetchUploadStudyRes = args => ({
    type: constants.FETCH_UPLOAD_RES,
    args
});
//获取老师学习资源
export const fetchTeacherData = args => ({
    type: constants.FETCH_TEACHER_DATA,
    args
});
//获取老师软件资源
export const fetchTeacherSoftware = args => ({
    type: constants.FETCH_TEACHER_SOFTWARE,
    args
});
//删除学习资源
export const deleteData = args => ({
    type: constants.DELETE_DATA,
    args
});
//删除软件资源
export const deleteSoftware = args => ({
   type: constants.DELETE_SOFTWARE,
    args
});
//老师获取学生信息
export const fetchStudentMes = args => ({
    type: constants.FETCH_STUDENT_MESSAGE,
    args
});

export const fetchLoadResource = args => ({
    type: constants.MATERIAL_LOAD,
    args
});
//搜索资源
export const fetchSearchValue = args => ({
    type: constants.FETCH_SEARCH_VALUE,
    args
});

export const changeType = key => ({
    type: constants.CHANGE_TYPE,
    key
});

//教师查询课程
export const fetchSearchCourse = args => ({
    type: constants.FETCH_SEARCH_COURSE,
    args
});

//morning

//所有课程
export const fetchCourse = args => ({
    type: constants.QUERY_COURSE,
    args,
});
//课程展开的任务
export const fetchCourseTask = (teacherCourseId, taskResource) =>({
    type: constants.QUERY_COURSE_TASK,
    teacherCourseId,
    taskResource
});

//查询我的课程
export const queryMyCourse = args =>({
    type:constants.QUERY_MY_COURSE,
    args
});
//教师添加课程
export const teacherAddCourse = args => ({
    type:constants.TEACHER_ADD_COURSE,
    args
});
//学生添加课程
export const studentAddCourse = args => ({
    type:constants.STUDENT_ADD_COURSE,
    args
});
//学生删除课程
export const studentDeleteCourse = args => ({
    type: constants.STUDENT_DELETE_COURSE,
    args
});
//学生上传作业
export const studentUploadHomework = args => ({
    type: constants.STUDENT_UPLOAD_HOMEWORK,
    args
});
//学生查看已提交作业
export const studentQuerySubmit = args => ({
    type: constants.STUDENT_QUERY_SUBMIT,
    args
})
//学生删除已交作业
export const studentDeleteHomework = args => ({
    type: constants.STUDENT_DELETE_HOMEWORK,
    args
});
//老师删除课程
export const teacherDeleteCourse = args =>({
    type: constants.TEACHER_DELETE_COURSE,
    args
});
//老师请求实验课程
export const teacherQueryCourse = args => ({
    type: constants.TEACHER_QUERY_COURSE,
    args
});
//老师发布任务
export const teacherReleaseTask = args => ({
    type: constants.TEACHER_RELEASE_TASKS,
    args
});
//老师添加教学班备注
export const teacherAddRemark = args => ({
    type: constants.TEACHER_ADD_REMARK,
    args
});
//老师删除实验任务
export const teacherDeleteTask = args => ({
    type: constants.TEACHER_DELETE_TASK,
    args
});
//老师修改实验任务
export const teacherUpdateTask = args => ({
    type: constants.TEACHER_UPDATE_TASK,
    args
});
//老师关闭/开启任务作业上传
export const teacherToggleUpload = args => ({
    type: constants.TEACHER_TOGGLE_TASK_UPLOAD,
    args
});
//老师查看已交作业名单
export const teacherQuerySubmit = taskId => ({
    type: constants.TEACHER_QUERY_SUBMIT,
    taskId
});
//老师查看未提交作业名单
export const teacherQueryUnsubmit = args => ({
    type: constants.TEACHER_QUERY_UNSUBMIT,
    args
});
//老师批量下载已经提交的作业
export const teacherDownloadSubmit = args => ({
    type: constants.TEACHER_DOWNLOAD_SUBMIT,
    args
});
