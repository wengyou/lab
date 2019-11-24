import { takeEvery, call, put } from "redux-saga/effects";
import {
    LOGIN,
    QUERY_HOMEWORK,
    QUERY_HOMEWORK_OK,
    REGISTER,
    QUERY_RESOURCE
} from "../../../constants/actionTypes";
import Service from "../../../lib/Service";
import { openNotification } from "../../../utils/commonFunction";
import {message} from "antd";

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

function *handleLogin(args) {
    try {
        const { userId, password} = args.args;
        const data = { userId, password};
        const res = yield call(Service.post, "login", data);

        console.log(res);
        switch (res.data.error_code) {
            case 0:
                openNotification(res.data.message, "已登陆");
                break;
            case 2:
                openNotification(res.data.message, "登录失败");
                break;
            case '-1':
                openNotification(res.data.message);
                break;
            default:
                return 0;
        }
    } catch (e) {
        console.log(e)
    }
}

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
            default:
                return 0;
        }
    } catch (e) {
        console.log(e)
    }
}

function *queryResource(args) {
    try {
        const { type, userId, file} = args.args;
        const data = {type, userId, file};

        const dataRes = yield call(Service.post, "queryResource", data);
        return dataRes;
    } catch (e) {

    }

}

export default function *watchStudentSagas() {
    yield takeEvery(QUERY_HOMEWORK, handleQueryHomework);
    yield takeEvery(LOGIN, handleLogin);
    yield takeEvery(REGISTER, handleRegister);
    yield takeEvery(QUERY_RESOURCE, queryResource)
}
