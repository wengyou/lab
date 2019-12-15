import { takeEvery, call, put } from "redux-saga/effects";
import {
    TEACHER_DELETE_TASK,
    TEACHER_QUERY_UNSUBMIT,
    TEACHER_UPDATE_TASK,
    TEACHER_QUERY_UNSUBMIT_SUCCESS,
    TEACHER_QUERY_SUBMIT,
    TEACHER_QUERY_SUBMIT_SUCCESS,
    TEACHER_TOGGLE_TASK_UPLOAD,
    STUDENT_QUERY_SUBMIT,
    STUDENT_QUERY_SUBMIT_SUCCESS,
    STUDENT_UPLOAD_HOMEWORK,
    STUDENT_UPLOAD_HOMEWORK_SUCCESS,
    STUDENT_DELETE_HOMEWORK,
    QUERY_COURSE_TASK_SUCCESS,
    QUERY_COURSE_TASK,
    TEACHER_DOWNLOAD_SUBMIT,
    TEACHER_DOWNLOAD_SUBMIT_SUCCESS,
    STUDENT_DELETE_HOMEWORK_SUCCESS,
    TEACHER_DELETE_TASK_SUCCESS,
    TEACHER_TOGGLE_TASK_UPLOAD_SUCCESS,
    TEACHER_UPDATE_TASK_SUCCESS, TEACHER_UPDATE_TASK_FAILED, STUDENT_UPLOAD_HOMEWORK_FAILED

} from "../../../constants/actionTypes";
import { message } from "antd";
import Service from "../../../lib/Service";

//老师修改任务
function* teacherUpdateTask(args) {
    try {
        const {id, taskName, file, teacherCourseId, userId} = args.args;
        const formData = new FormData();
        formData.append('id',id);
        formData.append('userId',userId);
        formData.append('taskName',taskName);
        formData.append('fileName', file);
        const res = yield call(Service.post, "teacher/updateTask", formData);
        switch (res.data.error_code) {
            case 0:
                message.success('修改任务成功~');
                const url = `course/queryCourseTask?teacherCourseId=${teacherCourseId}`;
                const res = yield call(Service.get, url);
                switch (res.data.error_code) {
                    case 0:
                        yield put({
                            type:TEACHER_UPDATE_TASK_SUCCESS,
                            payload: res.data.data,
                            teacherCourseId,
                        });
                        break;
                    default:
                        return 0;
                }
                break;
            case -1:
                yield put({
                    type: TEACHER_UPDATE_TASK_FAILED,
                });
                message.error("修改任务失败！");
                break;
        }
    }
    catch (e) {

    }
}

//老师删除实验任务
function *teacherDeleteTask(args) {
    try {
        const { taskId, teacherCourseId } = args.args;
        const data = {taskId};
        const res = yield call(Service.post, "teacher/deleteTask", data );
        switch (res.data.error_code) {
            case 0:
                message.success("删除实验任务成功！");
                yield put({
                    type: TEACHER_DELETE_TASK_SUCCESS,
                    taskId: taskId,
                    teacherCourseId: teacherCourseId
                });
                break;
            default:
                return 0;
        }
    }
    catch (e) {

    }
}

//教师开启/关闭实验任务作业的上传
function* teacherToggleTaskUpload(args) {
    const {taskId, teacherCourseId} = args.args;
    const data = {taskId};
    try {
        const res = yield call(Service.post, "teacher/toggleUpload", data);
        switch (res.data.error_code) {
            case 0:
                message.success("操作成功~");
                yield put({
                    type: TEACHER_TOGGLE_TASK_UPLOAD_SUCCESS,
                    taskId: taskId,
                    teacherCourseId: teacherCourseId
                })
                break;
            case -1:
                message.error("操作失败！");
                break;
            default:
                return 0;
        }
    }
    catch (e) {

    }
}

//教师查看未交作业同学名单
function* teacherQueryUnsubmit(args){
    try {
        const { teacherCourseId, taskId } = args.args;
        const url = `teacher/queryUnSubmit?teacherCourseId=${teacherCourseId}&taskId=${taskId}`;
        const res = yield call(Service.get, url);
        switch (res.data.error_code) {
            case 0:
              yield put({
                  type: TEACHER_QUERY_UNSUBMIT_SUCCESS,
                  payload: res.data.data,
              });
              break;
            default:
                return 0;
        }
    }
    catch (e) {

    }
}
//教师查看已交作业名单
function* teacherQuerySubmit(data){
    try {
        const { taskId } = data.taskId;
        const url = `teacher/queryWork?taskId=${taskId}`;
        const res = yield call(Service.get, url);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: TEACHER_QUERY_SUBMIT_SUCCESS,
                    payload: res.data.data,
                });
                break;
            default:
                return 0;
        }
    }
    catch (e) {

    }
}
//老师批量下载已提交作业
function* teacherDownloadSubmit(args){
    try {
        const { taskId, userIdList } = args.args;
        const data = { taskId, userIdList };
        const url = `teacher/downloadWorks`;
        const res = yield call(Service.post, url, data);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: TEACHER_DOWNLOAD_SUBMIT_SUCCESS,
                    payload: res.data.data
                });
                break;
            default:
                return 0;
        }
    }
    catch (e) {

    }
}

//学生上传任务作业
function* studentUploadHomework(args) {
    try {
        const {userId, studentCourseId, taskId, file} = args.args;
        console.log(file);
        const formData = new FormData;
        formData.append("userId", userId);
        formData.append("studentCourseId", studentCourseId);
        formData.append("taskId", taskId);
        file.forEach(
            e => (
                formData.append("file", e)
            )
        );
        const res = yield call(Service.post, "resource/uploadWorks", formData);
        switch (res.data.error_code) {
            case 0:
                message.success('上传成功~');
                yield put({
                    type: STUDENT_UPLOAD_HOMEWORK_SUCCESS
                });
                break;
            case -1:
                yield  put(
                {
                    type: STUDENT_UPLOAD_HOMEWORK_FAILED,
                }
            );
                break;
        }
    }
    catch (e) {

    }
}

//学生查看已经上传的作业
function* studentQuerySubmit(args){
    try {
        const { userId, taskId } = args.args;
        const url = `student/queryWork?userId=${userId}&taskId=${taskId}`;
        const res = yield call(Service.get, url);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: STUDENT_QUERY_SUBMIT_SUCCESS,
                    payload: res.data.data,
                });
                break;
            default:
                return 0;
        }
    }
    catch (e) {

    }
}

//学生删除已上传作业
function *studentDeleteHomework(args) {
    try {
        const {userId, workId} = args.args;
        const data = {userId, workId};
        const res = yield call(Service.post, "student/removeWork", data );
        switch (res.data.error_code) {
            case 0:
                message.success("删除作业成功~");
                yield put({
                    type: STUDENT_DELETE_HOMEWORK_SUCCESS,
                    payload: workId,
                });
                break;
            case -1:
                message.error("删除作业失败！");
            default:
                return 0;
        }
    }
    catch (e) {

    }
}
//老师学生获取任务详情
function* queryCourseTaskRes(data) {
    try {
        const {teacherCourseId, courseTask} = data.teacherCourseId;
        const url = `course/queryCourseTask?teacherCourseId=${teacherCourseId}`;
        const res = yield call(Service.get, url);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type:QUERY_COURSE_TASK_SUCCESS,
                    payload: res.data.data,
                    teacherCourseId,
                    courseTask
                });
                break;
            default:
                return 0;
        }
    }
    catch (e) {

    }
}

export default function* rootHandleTask() {
    yield takeEvery(TEACHER_DELETE_TASK, teacherDeleteTask);
    yield takeEvery(TEACHER_TOGGLE_TASK_UPLOAD, teacherToggleTaskUpload);
    yield takeEvery(TEACHER_QUERY_SUBMIT,teacherQuerySubmit);
    yield takeEvery(TEACHER_QUERY_UNSUBMIT,teacherQueryUnsubmit);
    yield takeEvery(TEACHER_UPDATE_TASK,teacherUpdateTask);
    yield takeEvery(TEACHER_DOWNLOAD_SUBMIT, teacherDownloadSubmit);
    yield takeEvery(STUDENT_QUERY_SUBMIT,studentQuerySubmit);
    yield takeEvery(STUDENT_UPLOAD_HOMEWORK, studentUploadHomework);
    yield takeEvery(STUDENT_DELETE_HOMEWORK, studentDeleteHomework);
    yield takeEvery(QUERY_COURSE_TASK, queryCourseTaskRes);
}
