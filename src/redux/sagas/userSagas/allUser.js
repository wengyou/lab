import { takeEvery, call, put } from "redux-saga/effects";
import {
    LOGIN,
    QUERY_HOMEWORK,
    QUERY_HOMEWORK_OK,
    REGISTER,
    REGISTER_SUCCESS,
    TEACHERRES,
    HANDLE_TEACHERRES_SUCCESS,
    LOGIN_SUCCESS,
    PRESERVE,
    PRESERVE_SUCCESS,
    FETCH_QUERY_REGISTER,
    FETCH_QUERY_REGISTER_SUCCESS,
    REGISTERED,
    REGISTERED_SUCCESS,
    SECRET_GUARD_EXISTENCE,
    SECRET_GUARD_EXISTENCE_SUCCESS,
    RESET_PASSWARD,
    CHECK_QUESTION,
    CHECK_QUESTION_SUCCESS,
    ADD_QUESTION,
    ADD_QUESTION_SUCCESS
} from "../../../constants/actionTypes";
import Service from "../../../lib/Service";
import { openNotification } from "../../../utils/commonFunction";

function *handleQueryHomework(args) {
    try {
        const { userId, taskId } = args;
        const data = { userId, taskId };
        const res = yield call(Service.post, "student/queryWork", data);
        if (res.data.error_code === 0) {
            yield put({type: QUERY_HOMEWORK_OK, payload: res.data.data})
        } else {

        }
    } catch (e) {

    }
}

//登录请求
function *handleLogin(args) {
    try {
        const { userId, password} = args.args;
        const data = { userId, password };
        const res = yield call(Service.post, "login", data);
        switch (res.data.error_code) {
            case -1:
                openNotification(res.data.message);
                break;
            case 0:
                let name = res.data.data.userName;
                let id = "游客";
                switch (res.data.data.type) {
                    case "student":
                        id = "学生";
                        break;
                    case "teacher":
                        id = "教师";
                        break;
                    case "admin":
                        id = "超级管理员";
                        break;
                    default:
                        return id;
                }
                sessionStorage.setItem("access", res.data.data.token);
                yield put({
                    type: LOGIN_SUCCESS,
                    payload: {
                        id,
                        name: res.data.data.userName,
                        userId: res.data.data.userId,
                        academy: res.data.data.academy,
                        class: res.data.data.cls,
                        discipline: res.data.data.discipline,
                        grade: res.data.data.grade,
                        sex: res.data.data.sex,
                        type: res.data.data.type,
                        phone: res.data.data.phone,
                        password: res.data.data.password,
                    }
                });
                openNotification(res.data.message, "已登陆");
                break;
            case 2:
                openNotification(res.data.message, "登录失败");
                break;
            case 1:
                openNotification(res.data.message);
                break;
            case 300:
                sessionStorage.setItem("access", res.data.data.token);
                yield put({
                    type: RESET_PASSWARD,
                    payload: res.data.data
                });
                openNotification('您是新用户，请添加密保问题');
                break;
            default:
                return 0;
        }
    } catch (e) {
        console.log(e)
    }
}

//注册请求
function *handleRegister(args) {
    try {
        const { academy, cls, discipline, grade, password, phone, sex, teacherId, userId, userName } = args.args;
        const data = {academy, cls, discipline, grade, password, phone, sex, teacherId, userId, userName};
        const res = yield call(Service.post, "register", data);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: REGISTER_SUCCESS,
                });
                openNotification(res.data.message);
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return 0;
        }
    } catch (e) {
        console.log(e)
    }
}

//请求所有老师姓名
function *handleTeacher() {
    try {
        const teacherRes = yield call(Service.get, "queryAllTeacher");
        let itemsArr = teacherRes.data.data.items;
        let teacherName = itemsArr.map((item,index) => {
            return  [item.userName, item.userId];
        });
        switch (teacherRes.data.error_code) {
            case 0:
                yield put({
                    type: HANDLE_TEACHERRES_SUCCESS,
                    payload: [...teacherName]
                });
                break;
            case -1:
                openNotification(teacherRes.data.message);
                break;
            case 1:
                openNotification(teacherRes.data.message);
                break;
            case 2:
                openNotification(teacherRes.data.message);
                break;
            default:
                return 0
        }
    } catch (e) {
        console.log(e)
    }
}

//修改自己信息
function *handlePreserve(args) {
    try {
        const {userId, userName, grade, academy, discipline, cls, phone, sex, password} = args.args;
        const data = {userId, userName, grade, academy, discipline, cls, phone, sex, password};
        const res = yield call(Service.post, "user/updateMySelfInfo", data);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: PRESERVE_SUCCESS,
                    payload: res.data.data
                });
                openNotification(res.data.message);
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                openNotification("修改密码失败");
        }
    } catch(e) {

    }
}

//老师查询待批准的学生
function *handleQueryRegister(data) {
    const { userId, type, page } = data.args;
    const url = `register/queryRegister?userId=${userId}&type=${type}&page=${page}`;
    const res = yield call(Service.get, url);
    switch (res.data.error_code) {
        case 0:
            yield put({
                type: FETCH_QUERY_REGISTER_SUCCESS,
                payload: res.data.data
            });
            break;
        case -1:
            openNotification(res.data.message);
            break;
        case 1:
            openNotification(res.data.message);
            break;
        case 2:
            openNotification(res.data.message);
            break;
        default:
            return 0
    }
}

//老师批准注册用户
function *handleRegistered(args) {
    const {userId} = args.args;
    let formData = new FormData();
    formData.append("list", userId);
    const list = formData.get("list");
    const data = {list};
    const res = yield call(Service.post, "register/registered" ,data);
    switch (res.data.error_code) {
        case 0:
            yield put({
                type: REGISTERED_SUCCESS,
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
}

//查询是否有密保问题
function *secretGuardExistence(args) {
    const res = yield call(Service.get, `user/secretGuardExistence?userId=${args.args}`);
    if(res.data.error_code === 0) {
        yield put({
            type: SECRET_GUARD_EXISTENCE_SUCCESS,
            payload: res.data.data
        })
    } else {
        openNotification(res.data.message)
    }
}
//验证密保
function *checkQuestion(args) {
    const res = yield call(Service.get, `user/checkSecretGuard?userId=${args.args.userId}&question=${args.args.question}&answer=${args.args.answer}&password=${args.args.password}`,);
    if(res.data.error_code === 0) {
        openNotification('修改密码成功')
        yield put({
            type: CHECK_QUESTION_SUCCESS,
            payload: res.data.data
        })
    } else {
        openNotification(res.data.message)
    }
}

//添加密保
function *addQuestion(args) {
    const res = yield call(Service.post, 'user/addSecretGuard', args.args);
    if(res.data.error_code === 0) {
        openNotification('添加密保问题成功')
        yield put({
            type: ADD_QUESTION_SUCCESS,
        })
    } else {
        openNotification(res.data.message)
    }
}

export default function *watchStudentSagas() {
    yield takeEvery(QUERY_HOMEWORK, handleQueryHomework);
    yield takeEvery(LOGIN, handleLogin);
    yield takeEvery(REGISTER, handleRegister);
    yield takeEvery(TEACHERRES,handleTeacher);
    yield takeEvery(PRESERVE, handlePreserve);
    yield takeEvery(FETCH_QUERY_REGISTER, handleQueryRegister);
    yield takeEvery(REGISTERED, handleRegistered);
    yield takeEvery(SECRET_GUARD_EXISTENCE, secretGuardExistence);
    yield takeEvery(CHECK_QUESTION, checkQuestion);
    yield takeEvery(ADD_QUESTION, addQuestion);
}
