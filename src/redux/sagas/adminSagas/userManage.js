import { takeEvery, call, put } from "redux-saga/effects";
import Service from "../../../lib/Service";
import {
    FETCH_ADMINISTRATOR_DATA,
    ADD_NEW_ADMIN,
    ADD_NEW_ADMIN_SUCCESS,
    MODIFY_ADMIN,
    MODIFY_ADMIN_SUCCESS,
    ADD_NEW_TEACHER,
    ADD_NEW_TEACHER_SUCCESS,
    SEARCH_TEACHER,
    SEARCH_TEACHER_SUCCESS,
    FETCH_ADMINISTRATOR_DATA_SUCCESS,
    FETCH_TEACHER_RES,
    FETCH_TEACHER_RES_SUCCESS,
    DELETE_TEACHER,
    DELETE_TEACHER_SUCCESS,
    MODIFY_TEACHER,
    MODIFY_TEACHER_SUCCESS,
    FETCH_STUDENT_DATA,
    FETCH_STUDENT_DATA_SUCCESS,
    ADD_NEW_STUDENT,
    ADD_NEW_STUDENT_SUCCESS,
    DELETE_STUDENT,
    DELETE_STUDENT_SUCCESS,
    MODIFY_STUDENT,
    MODIFY_STUDENT_SUCCESS,
    SEARCH_STUDENT,
    SEARCH_STUDENT_SUCCESS,
    IMPORT_USER,
    IMPORT_USER_success,
    FETCH_REGISTER_DATA,
    FETCH_REGISTER_DATA_SUCCESS,
    AGREE_REGISTER,
    AGREE_REGISTER_SUCCESS,
    DELETE_REGISTER_USER,
    DELETE_REGISTER_USER_SUCCESS,
    RESET_PASSWORD,
    RESET_PASSWORD_SUCCESS
} from "../../../constants/actionTypes";
import { openNotification} from "../../../utils/commonFunction";

//添加新的管理员
function *addNewAdmin(args) {
    try{
        const {userId, userName, type, academy, sex, adminData} = args.args;
        const data = {userId, userName, type, academy, sex};
        const res = yield call(Service.post, "admin/addUser", data);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: ADD_NEW_ADMIN_SUCCESS,
                    payloadA: adminData,
                    newDataA: data
                });
                openNotification(res.data.message);
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return openNotification('添加管理员失败');
        }
    }catch (e) {
        console.log(e);
    }
}
//添加新的教师
function *addNewTeacher(args) {
    try{
        const {userId, userName,adminTeacherData, type, sex, discipline} = args.args;
        const data = {userId, userName, type, sex, discipline};
        const res = yield call(Service.post, "admin/addUser", data);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: ADD_NEW_TEACHER_SUCCESS,
                    payload: adminTeacherData,
                    newData: data
                });
                openNotification(res.data.message);
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return 0
        }
    }catch (e) {
        console.log(e)
    }
}
//获取管理员信息
function *fetchAdminData(data) {
    try{
        const {page, type} = data.args;
        const res = yield call(Service.get,
            `user/userInfo?page=${page}&type=${type}`);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: FETCH_ADMINISTRATOR_DATA_SUCCESS,
                    payload: res.data.data
                });
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return openNotification('获取管理员信息失败')
        }
    }catch (e) {
        console.log(e);
    }
}
//修改管理员信息
function *modifyAdmin(args) {
    try {
        const { userId, userName, academy, sex } = args.args;
        const data = {userId, userName, academy, sex };
        const res = yield call(Service.post, "user/updateUserInfo", data);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: MODIFY_ADMIN_SUCCESS,
                });
                openNotification(res.data.message);
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return 0
        }
    }catch (e) {
        console.log(e);
    }
}
//获取教师信息
function *fetchTeacherData(data) {
    try{
        const {page, type} = data.args;
        const res = yield call(Service.get,
            `user/userInfo?page=${page}&type=${type}`);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: FETCH_TEACHER_RES_SUCCESS,
                    payload: res.data.data
                });
                break;
            case 1:
                openNotification(res.data.message);
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return 0
        }
    }catch (e) {
        console.log(e);
    }
}
//删除教师
function *deleteTeacher(args) {
    try {
        const { list } = args.args;
        let formData = new FormData();
        formData.append('list', list);
        const res = yield call(Service.post, "admin/deleteUsers", formData);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: DELETE_TEACHER_SUCCESS, payload: null
                });
                openNotification(res.data.message);
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                break;
        }
    }catch (e) {
        console.log(e);
    }
}
//修改教师信息
function *modifyTeacher(args) {
    try {
        const { userId, userName, academy, phone, sex} = args.args;
        const data = { userId, userName, academy, phone, sex};
        const res = yield call(Service.post, "user/updateUserInfo", data);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: MODIFY_TEACHER_SUCCESS,
                });
                openNotification(res.data.message);
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return 0;
        }
    }catch (e) {
        console.log(e);
    }
}
//搜索老师
function *searchTeacher(data) {
    try {
        const {page, type, userName } = data.args;
        const res = yield call(Service.get,`user/userInfo?page=${page}&type=${type}&userName=${userName}`)
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: SEARCH_TEACHER_SUCCESS,
                    payload: res.data.data
                });
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return 0;
        }
    }catch (e) {
        console.log(e);
    }
}
//获取学生信息
function *fetchStudentData(data) {
    try{
        const {page, type} = data.args;
        const res = yield call(Service.get,
            `user/userInfo?page=${page}&type=${type}`);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: FETCH_STUDENT_DATA_SUCCESS,
                    payload: res.data.data
                });
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return 0;
        }
    }catch (e) {
        console.log(e);
    }
}
//添加学生
function *addNewStudent(args) {
    try {
        const { type, userId, userName, grade, academy, discipline, cls, phone, sex, adminStudentData} = args.args;
        const data = { type, userId, userName, grade, academy, discipline, cls, phone, sex };
        const res = yield call(Service.post, "admin/addUser", data);
        switch (res.data.error_code) {
            case 0:
                openNotification(res.data.message);
                yield put({
                    type: ADD_NEW_STUDENT_SUCCESS,
                    payloadS: adminStudentData,
                    newDataS: res.data.data,
                });
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return 0;
        }
    }catch (e) {
        console.log(e);
    }
}
//删除学生
function *deleteStudent(args) {
    try {
        const { list } = args.args;
        let formData = new FormData();
        formData.append('list', list);
        const res = yield call(Service.post, "admin/deleteUsers", formData);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: DELETE_STUDENT_SUCCESS
                });
                openNotification(res.data.message);
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                break;
        }
    }catch (e) {
        console.log(e);
    }
}
//修改学生
function *modifyStudent(args) {
    try {
        const { userId, userName, grade, academy, discipline, cls, phone, sex } = args.args;
        const data = { userId, userName, grade, academy, discipline, cls, phone, sex };
        const res = yield call(Service.post, "user/updateMySelfInfo", data);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: MODIFY_STUDENT_SUCCESS,
                });
                openNotification(res.data.message);
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return openNotification('修改信息失败');
        }
        }catch (e) {
        console.log(e);
    }
}
//搜索学生
function *searchStudent(data) {
    try {
        const {page, value, type, flag } = data.args;
        let url;
        if (flag === "userName") {
            url = `user/userInfo?page=${page}&userName=${value}&type=${type}`;
        } else if (flag === "userId") {
            url = `user/userInfo?page=${page}&userId=${value}&type=${type}`;
        } else {
            url = `user/userInfo?page=${page}&grade=${value}&type=${type}`;
        }
        const res = yield call(Service.get, url);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: SEARCH_STUDENT_SUCCESS,
                    payload: res.data.data
                });
                break;
            case -1:
                openNotification(res.data.message);
               break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return 0;
        }
    }catch (e) {
        console.log(e);
    }
}
//导入学生
function *importStudent(args) {
    try {
        const {file} = args.args;
        const formData = new FormData();
        formData.append("file", file);
        const res = yield call(Service.post, "admin/importUser", formData);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: IMPORT_USER_success,
                    payload: res.data.data
                });
                openNotification(res.data.message);
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return 0
        }
    }catch (e) {
        console.log(e);
    }
}
//获取注册用户信息
function *fetchRegisterUserData(data) {
    try {
        const {page, type, userId} = data.args;
        const res = yield call(Service.get, `register/queryRegister?page=${page}&type=${type}&userId=${userId}`);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: FETCH_REGISTER_DATA_SUCCESS,
                    payload: res.data.data
                });
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return 0
        }
    }catch (e) {
        console.log(e);
    }
}
//用户授权
function *agreeRegister(args) {
    try {
        const {list} = args.args;
        let formData = new FormData();
        formData.append('list', list);
        const res = yield call(Service.post, "register/registered", formData);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: AGREE_REGISTER_SUCCESS,
                });
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return 0
        }
    }catch (e) {
        console.log(e);
    }
}
//删除注册用户
function *deleteRegisterUser(args) {
    try {
        const { list } = args.args;
        let formData = new FormData();
        formData.append('userIdList', list);
        const res = yield call(Service.post, "register/deleteRegister", formData);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: DELETE_REGISTER_USER_SUCCESS,
                });
                openNotification(res.data.message);
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return 0
        }
    }catch (e) {
        console.log(e);
    }
}
//重置密码
function *resetPassword(args) {
    try {
        const res = yield call(Service.post, 'user/resetPassword', args.args);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: RESET_PASSWORD_SUCCESS,
                });
                openNotification(res.data.message);
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return openNotification('重置密码失败')
            }
    } catch (e) {
        console.log(e)
    }
}

export default function *rootAdminSagas() {
    yield takeEvery(ADD_NEW_ADMIN, addNewAdmin);
    yield takeEvery(ADD_NEW_TEACHER, addNewTeacher);
    yield takeEvery(FETCH_ADMINISTRATOR_DATA, fetchAdminData);
    yield takeEvery(FETCH_TEACHER_RES, fetchTeacherData);
    yield takeEvery(DELETE_TEACHER, deleteTeacher);
    yield takeEvery(MODIFY_TEACHER, modifyTeacher);
    yield takeEvery(FETCH_STUDENT_DATA, fetchStudentData);
    yield takeEvery(FETCH_REGISTER_DATA, fetchRegisterUserData);
    yield takeEvery(AGREE_REGISTER, agreeRegister);
    yield takeEvery(MODIFY_ADMIN, modifyAdmin);
    yield takeEvery(SEARCH_TEACHER,searchTeacher);
    yield takeEvery(ADD_NEW_STUDENT, addNewStudent);
    yield takeEvery(DELETE_STUDENT, deleteStudent);
    yield takeEvery(MODIFY_STUDENT, modifyStudent);
    yield takeEvery(SEARCH_STUDENT, searchStudent);
    yield takeEvery(DELETE_REGISTER_USER, deleteRegisterUser);
    yield takeEvery(IMPORT_USER, importStudent);
    yield takeEvery(RESET_PASSWORD, resetPassword);
}
