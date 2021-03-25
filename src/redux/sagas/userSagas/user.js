import { takeEvery, call, put } from "redux-saga/effects";
import Service from "../../../lib/Service";
import {
    KEEP_ALIVE,
    LOGIN_SUCCESS,
    COUNTER,
    COUNTER_SUCCESS,
    FETCH_PARAM,
    FETCH_PARAM_SUCCESS,
    QUERY_SECRET,
    QUERY_SECRET_SUCCESS
} from "../../../constants/actionTypes";
import {openNotification} from "../../../utils/commonFunction";

function *handleKeepAlive() {
    try {
        const res = yield call(Service.get, 'keep_alive');
        if (res.data.error_code === 0) {
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
            })
        }
    } catch (e) {
        console.log(e);
    }
}

//访问量
function *counter() {
    const res = yield call(Service.get, "counter");
    switch (res.data.error_code) {
        case 0:
            yield put({
                type: COUNTER_SUCCESS,
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
}
//获取系统参数
function *handleParam() {
    const res = yield call(Service.get, `system/queryParameters`);
    switch (res.data.error_code) {
        case 0:
            yield put({
                type: FETCH_PARAM_SUCCESS,
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
}

// 是否存在密保问题
function *querySecret(args) {
    const res = yield call(Service.get, `user/secretGuardExistence?userId=${args.userId}`);
    switch (res.data.error_code) {
        case 0:
            yield put({
                type: QUERY_SECRET_SUCCESS,
                payload: res.data
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
}

export default function *rootUserSagas() {
    yield takeEvery(KEEP_ALIVE, handleKeepAlive);
    yield takeEvery(COUNTER,counter);
    yield takeEvery(FETCH_PARAM,handleParam);
    yield takeEvery(QUERY_SECRET,querySecret);
}
