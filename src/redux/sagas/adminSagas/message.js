import { takeEvery, call, put } from "redux-saga/effects";
import Service from "../../../lib/Service";
import {
    FETCH_ADMINISTRATOR_DATA,
    FETCH_ADMINISTRATOR_DATA_SUCCESS,
    FETCH_TEACHER_RES,
    FETCH_TEACHER_RES_SUCCESS
} from "../../../constants/actionTypes";
import {Decrypt} from "../../../utils/commonFunction"


//获取管理员信息
function *fetchAdminData(data) {
    try{
        const {page, type} = data.args;
        const res = yield call(Service.get,
            `user/userInfo?page=${page}&type=${type}`);
        const password = Decrypt(res.data.data.items[0].password);
        let adminData = res.data.data.items;
        adminData[0].password = password;
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: FETCH_ADMINISTRATOR_DATA_SUCCESS,
                    payload: adminData
                });
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
        console.log(res.data.data);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: FETCH_TEACHER_RES_SUCCESS,
                    payload: res.data.data
                });
            default:
                return 0
        }
    }catch (e) {
        console.log(e);
    }
}

export default function *rootAdminSagas() {
    yield takeEvery(FETCH_ADMINISTRATOR_DATA, fetchAdminData);
    yield takeEvery(FETCH_TEACHER_RES, fetchTeacherData);
}