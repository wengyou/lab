import { takeEvery, call, put } from "redux-saga/effects";
import Service from "../../../lib/Service";
import {
    FETCH_ADMINISTRATOR_DATA,
    FETCH_NEW_ADMIN,
    ADD_NEW_TEACHER,
    ADD_NEW_TEACHER_SUCCESS
} from "../../../constants/actionTypes";
import {Decrypt} from "../../../utils/commonFunction"

//添加新的管理员
function *addNewAdmin(args) {
    try{
        const {userId, userName, type, academy, sex} = args.args;
        const data = {userId, userName, type, academy, sex};
        const res = yield call(Service.post, "admin/addUser", data);
        console.log(res);
    }catch (e) {
        console.log(e);
    }
}

//添加新的教师
function *addNewTeacher(args) {
    try{
        const {userId, userName, type, academy, sex} = args.args;
        const data = {userId, userName, type, academy, sex};
        const res = yield call(Service.post, "admin/addUser", data);
        console.log(res.data.data);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: ADD_NEW_TEACHER_SUCCESS,
                    payload: [res.data.data]
                })
        }
    }catch (e) {
        console.log(e)
    }
}


export default function *rootAdminSagas() {
    yield takeEvery(FETCH_NEW_ADMIN, addNewAdmin);
    yield takeEvery(ADD_NEW_TEACHER, addNewTeacher);
}