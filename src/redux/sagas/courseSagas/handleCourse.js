//一系列课程处理操作，老师学生添加，删除课程，老师添加课程备注
import { call, put, takeEvery } from "redux-saga/effects";
import Service from "../../../lib/Service";
import {
    TEACHER_ADD_COURSE,
    STUDENT_ADD_COURSE,
    TEACHER_DELETE_COURSE,
    STUDENT_DELETE_COURSE,
    TEACHER_ADD_REMARK,
    TEACHER_RELEASE_TASKS,
    STUDENT_DELETE_COURSE_SUCCESS,
    STUDENT_ADD_COURSE_SUCCESS,
    TEACHER_DELETE_COURSE_SUCCESS,
    TEACHER_ADD_REMARK_SUCCESS,
    QUERY_MY_COURSE_SUCCESS,
    QUERY_COURSE_TASK_SUCCESS,
    TEACHER_RELEASE_TASKS_SUCCESS,
    TEACHER_ADD_COURSE_SUCCESS, TEACHER_RELEASE_TASKS_FAILED
} from "../../../constants/actionTypes";
import { message } from "antd";


//学生添加课程
function* studentAddCourse(args) {
    try {
        const { teacherCourseId, userId, type } = args.args;
        const data = { teacherCourseId, userId };
        const res = yield call(Service.post, "student/addCourse", data );
        switch (res.data.error_code) {
            case 0:
                message.success("添加成功~");
                const updateUrl = `course/queryMyCourse?userId=${userId}&type=${type}`;
                const updateRes = yield call(Service.get, updateUrl);
                switch(updateRes.data.error_code) {
                    case 0:
                        yield put({
                            type: STUDENT_ADD_COURSE_SUCCESS,
                            payload: teacherCourseId

                        });
                        yield put({
                            type: QUERY_MY_COURSE_SUCCESS,
                            payload: updateRes.data.data,
                        });
                        break;
                    default:
                        return 0;
                }
                break;
            case -1:
                message.error("请勿重复添加！");
                break;
        }
    }
    catch (e) {
    }
}

//老师添加课程
function* teacherAddCourse(args) {
    try {
        const { courseId, teacherId, teacherCourseId,type } = args.args;
        const data = { courseId, teacherId };
        const res = yield call(Service.post, "teacher/addCourse", data );
        switch (res.data.error_code) {
            case 0:
                message.success( "添加成功~");
                const updateUrl = `course/queryMyCourse?userId=${teacherId}&type=${type}`;
                const updateRes = yield call(Service.get, updateUrl);
                switch(updateRes.data.error_code) {
                    case 0:
                        yield put({
                            type: TEACHER_ADD_COURSE_SUCCESS,
                            payload: courseId
                        });
                        yield put({
                            type: QUERY_MY_COURSE_SUCCESS,
                            payload: updateRes.data.data,
                        });
                        break;
                    default:
                        return 0;
                }
                break;
            case -1:
                message.error("请勿重复添加！");
                break;
        }
    }
    catch (e) {
    }
}

//学生删除课程
function* studentDeleteCourse(args) {
    try {
        const { studentCourseId, userId, teacherCourseId } = args.args;
        const data = { studentCourseId, userId };
        const res = yield call(Service.post, "student/deleteCourse", data );
        console.log(studentCourseId, data.studentCourseId)
        switch (res.data.error_code) {
            case 0:
                message.success("删除成功~");
                yield put({
                    type: STUDENT_DELETE_COURSE_SUCCESS,
                    teacherCourseId: teacherCourseId,
                    studentCourseId: studentCourseId
                })
                break;
            case -1:
                message.error("删除失败！")
        }
    }
    catch (e) {
    }
}
//老师删除课程
function* teacherDeleteCourse(args) {
    try {
        const { id, userId, courseId } = args.args;
        const data = { id, userId };
        const res = yield call(Service.post, "teacher/deleteCourse", data );
        switch (res.data.error_code) {
            case 0:
                message.success( "删除成功！");
                yield put({
                    type: TEACHER_DELETE_COURSE_SUCCESS,
                    payload: courseId,
                });
                break;
            case -1:
                message.error("删除失败！");
                break;
        }
    }
    catch (e) {
    }
}

//老师添加课程备注
function* teacherAddRemark(args) {
    try {
        const {teacherCourseId, remark} = args.args;
        const data = {teacherCourseId, remark};
        const res = yield call(Service.post, "teacher/addRemark", data);
        switch (res.data.error_code) {
            case 0:
                message.success("操作成功~");
                yield put({
                    type: TEACHER_ADD_REMARK_SUCCESS,
                    payload: data
                })
                break;
            case -1:
                message.error("操作失败！");
            default:
                return 0;
        }
    }
    catch (e) {

    }
}

//老师发布课程任务
function* teacherReleaseTask(args) {
    try {
        const {teacherCourseId, userId, taskName, file} = args.args;
        const formData = new FormData();
        formData.append('teacherCourseId',teacherCourseId);
        formData.append('userId',userId);
        formData.append('taskName',taskName);
        formData.append('fileName', file);
        const res = yield call(Service.post, "teacher/addCourseTask", formData);
        switch (res.data.error_code) {
            case 0:
                message.success('发布任务成功~');
                const url = `course/queryCourseTask?teacherCourseId=${teacherCourseId}`;
                const res = yield call(Service.get, url);
                console.log(res.data.data)
                switch (res.data.error_code) {
                    case 0:
                        yield put({
                            type:TEACHER_RELEASE_TASKS_SUCCESS,
                            payload: res.data.data,
                            teacherCourseId,
                        });
                        break;
                    default:
                        return 0;
                }
                break;
            case -1:
                yield put(
                    {
                        type: TEACHER_RELEASE_TASKS_FAILED,
                    }
                );
                message.error("已发布过该实验任务！");
                break;
        }
    }
    catch (e) {

    }
}

export default function* rootStudentAddCourse() {
    yield takeEvery(STUDENT_ADD_COURSE, studentAddCourse);
    yield takeEvery(TEACHER_ADD_COURSE, teacherAddCourse);
    yield takeEvery(TEACHER_DELETE_COURSE, teacherDeleteCourse);
    yield takeEvery(STUDENT_DELETE_COURSE, studentDeleteCourse);
    yield takeEvery(TEACHER_ADD_REMARK, teacherAddRemark);
    yield takeEvery(TEACHER_RELEASE_TASKS, teacherReleaseTask);
}
