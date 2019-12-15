import { takeEvery, call, put } from "redux-saga/effects";
import {
    LOGIN,
    QUERY_HOMEWORK,
    QUERY_HOMEWORK_OK,
    REGISTER,
    TEACHERRES,
    HANDLE_TEACHERRES_SUCCESS,
    LOGIN_SUCCESS,
    PRESERVE,
    PRESERVE_SUCCESS,
    FETCH_QUERY_REGISTER,
    FETCH_QUERY_REGISTER_SUCCESS,
    REGISTERED
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
        console.log(res.data.data);
        let name = res.data.data.userName;
        switch (res.data.error_code) {
            case 0:
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
                localStorage.setItem("access", res.data.data.token);
                yield put({
                    type: LOGIN_SUCCESS,
                    payload: {
                        id,
                        name,
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
            case -1:
                openNotification(res.data.message);
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
                openNotification(res.data.message);
                break;
            case -1:
                openNotification(res.data.message);
                break;
            case 2:
                openNotification(res.data.message);
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
            return  item.userName;
        });
        console.log(...teacherName);
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
        console.log(res.data.data);
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
            case 2:
                openNotification(res.data.message);
                break;
        }
    } catch(e) {

    }
}

//老师查询待批准的学生
function *handleQueryRegister(data) {
    const { userId, type, page } = data.args;
    const url = `register/queryRegister?userId=${userId}&type=${type}&page=${page}`;
    const res = yield call(Service.get, url);
    console.log(res.data.data);
    switch (res.data.error_code) {
        case 0:
            yield put({
                type: FETCH_QUERY_REGISTER_SUCCESS,
                payload: res.data.data
            });
            break;
        default:
            return 0
    }
}

//老师批准注册用户
function *handleRegistered(args) {
    const {userId} = args.args;
    const res = yield call(Service.post, userId);
    switch (res.data.error_code) {
        case 0:
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





// function *queryResource(args) {
//     try {
//         const { type, userId, file} = args.args;
//         const data = {type, userId, file};
//
//         const dataRes = yield call(Service.post, "queryResource", data);
//         return dataRes;
//     } catch (e) {
//
//     }
//
// }

export default function *watchStudentSagas() {
    yield takeEvery(QUERY_HOMEWORK, handleQueryHomework);
    yield takeEvery(LOGIN, handleLogin);
    yield takeEvery(REGISTER, handleRegister);
    yield takeEvery(TEACHERRES,handleTeacher);
    yield takeEvery(PRESERVE, handlePreserve);
    yield takeEvery(FETCH_QUERY_REGISTER, handleQueryRegister);
    yield takeEvery(REGISTERED, handleRegistered);
    // yield takeEvery(QUERY_RESOURCE, queryResource)
}
