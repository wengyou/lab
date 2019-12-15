import { takeEvery, call, put } from "redux-saga/effects";
import Service from "../../../lib/Service";
import {KEEP_ALIVE, LOGIN_SUCCESS} from "../../../constants/actionTypes";

function *handleKeepAlive() {
    try {
        const res = yield call(Service.get, 'keep_alive');
        console.log(res.data.data);
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

    }
}

export default function *rootUserSagas() {
    yield takeEvery(KEEP_ALIVE, handleKeepAlive);
}