import { takeEvery, call, put } from "redux-saga/effects";
import Service from "../../../lib/Service";
import {
    ADMIN_ADD_LABCOURSE,
    ADMIN_ADD_LABCOURSE_SUCCESS,
    ADMIN_DELETE_LABCOURSE,
    ADMIN_DELETE_LABCOURSE_SUCCESS,
    ADMIN_DELETE_TEACHERCOURSES,
    ADMIN_DELETE_TEACHERCOURSES_SUCCESS,
    ADMIN_IMPORT_LABCOURSE,
    ADMIN_IMPORT_LABCOURSE_SUCCESS,
    ADMIN_QUERY_LABCOURSE,
    ADMIN_QUERY_LABCOURSE_SUCCESS,
    ADMIN_QUERY_STUDENTCOURSE,
    ADMIN_QUERY_STUDENTCOURSE_SUCCESS,
    DELETE_STUDENTCOURSE_SUCCESS,
    DELETE_STUDENTCOURSE,

} from "../../../constants/actionTypes";
import { message } from "antd";

function* adminQueryLabCourse(data) {
    try{
        const { userId, page, courseName } = data.args;
        const url = courseName ? `course/allCourse?page=${page}&userId=${userId}&courseName=${courseName}`:
            `course/allCourse?page=${page}&userId=${userId}`
        ;
        const res = yield call(Service.get, url);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: ADMIN_QUERY_LABCOURSE_SUCCESS,
                    payload: res.data.data,
                })
        }
    }
    catch (e) {
    }
}

function* adminAddlabCourse(args) {
    try{
        const { courseName, courseNumber, userId } = args.args;
        const data = { courseName, courseNumber, userId };
        const res = yield call(Service.post, "admin/addCourse", data );
        switch (res.data.error_code) {
            case 0:
                message.success("添加成功~");
                yield put({
                    type: ADMIN_ADD_LABCOURSE_SUCCESS,
                });
                yield call(Service.get, `course/allCourse?page=1&userId=${userId}`);
                break;
            case -1:
                message.error("添加失败！");
                break;
            case 1:
                message.error("权限不足！");
                break;
            default:
                return 0;
        }
    }
    catch (e) {
    }
}
function* adminDeletelabCourse(args) {
    try{
        const { courseIdList } = args.args;
        const formData = new FormData;
        formData.append("courseIdList", courseIdList);
        const data = { courseIdList };
        const res = yield call(Service.post, "admin/deleteCourse", formData );
        switch (res.data.error_code) {
            case 0:
                message.success("删除成功~");
                yield put({
                    type: ADMIN_DELETE_LABCOURSE_SUCCESS,
                });
                break;
            case -1:
                message.error("删除失败！");
                break;
            case 1:
                message.error("权限不足！");
                break;
            default:
                return 0;
        }
    }
    catch (e) {
    }
}
function* adminImportlabCourse(args) {
    try{
        const { userId, file } = args.args;
        const formData = new FormData;
        formData.append("userId", userId);
        formData.append("file", file[0]);
        const res = yield call(Service.post, "admin/importCourse", formData );
        switch (res.data.error_code) {
            case 0:
                message.success(res.data.message);
                yield put({
                    type: ADMIN_IMPORT_LABCOURSE_SUCCESS,
                });
                break;
            case -1:
                message.error("导入失败！");
                break;
            case 1:
                message.error("权限不足！");
                break;
            default:
                return 0;
        }
    }
    catch (e) {
    }
}

function* adminQueryStudentCourse(data) {
    try {
        const {page, studentName, studentId} = data.args;
        const url = `admin/queryStudentCourse?page=${page}&studentName=${studentName}&studentId=${studentId}`;
        const res = yield call(Service.get, url);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: ADMIN_QUERY_STUDENTCOURSE_SUCCESS,
                    payload: res.data.data,
                });
                break;
            default:
                return 0;
        }
    }catch(e){

    }

}
function* adminDeleteTeacherCourse(args) {
    try{
        const { teacherCourseIdList } = args.args;
        const formData = new FormData;
        formData.append("teacherCourseIdList", teacherCourseIdList);
        const res = yield call(Service.post, "admin/deleteTeacherCourses", formData );
        switch (res.data.error_code) {
            case 0:
                message.success(res.data.message);
                yield put({
                    type: ADMIN_DELETE_TEACHERCOURSES_SUCCESS,
                });
                break;
            case -1:
                message.error("删除失败！");
                break;
            case 1:
                message.error("权限不足！");
                break;
            default:
                return 0;
        }
    }
    catch (e) {
    }
}

function* deleteStudentCourse(args) {
    try{
        const { studentCourseIdList } = args.args;
        const formData = new FormData;
        formData.append("studentCourseIdList", studentCourseIdList);
        const res = yield call(Service.post, "teacher/deleteStudentCourses", formData );
        switch (res.data.error_code) {
            case 0:
                message.success(res.data.message);
                yield put({
                    type: DELETE_STUDENTCOURSE_SUCCESS,
                });
                break;
            case -1:
                message.error("删除失败！");
                break;
            case 1:
                message.error("权限不足！");
                break;
            default:
                return 0;
        }
    }
    catch (e) {
    }
}

export default function* rootLabCourse() {
    yield takeEvery(ADMIN_QUERY_LABCOURSE, adminQueryLabCourse);
    yield takeEvery(ADMIN_ADD_LABCOURSE, adminAddlabCourse);
    yield takeEvery(ADMIN_DELETE_LABCOURSE, adminDeletelabCourse);
    yield takeEvery(ADMIN_IMPORT_LABCOURSE, adminImportlabCourse);
    yield takeEvery(ADMIN_QUERY_STUDENTCOURSE, adminQueryStudentCourse);
    yield takeEvery(ADMIN_DELETE_TEACHERCOURSES, adminDeleteTeacherCourse);
    yield takeEvery(DELETE_STUDENTCOURSE, deleteStudentCourse);
}