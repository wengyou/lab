import { takeEvery, call, put} from "redux-saga/effects";
import {
    FETCH_STUDY_RES_SUCCESS,
    FETCH_STUDY_RESOURCE,
    FETCH_TEACHER_DATA,
    FETCH_TEACHER_DATA_SUCCESS,
    DELETE_DATA,
    DELETE_DATA_SUCCESS,
} from "../../../constants/actionTypes";
import Service from "../../../lib/Service";
import { openNotification } from "../../../utils/commonFunction";

function *fetchStudyRes(data) {
    try {
        const {page, type, resourceName, userName} = data.args;
        let url;
        if (data.args.resourceName !== null) {
            url = `resource/queryResource?page=${page}&type=${type}&resourceName=${resourceName}`;
        } else if (data.args.userName !== null) {
            url = `resource/queryResource?page=${page}&type=${type}&userName=${userName}`;
        } else {
            url = `resource/queryResource?page=${page}&type=${type}`;
        }
        const res = yield call(Service.get, url);
        const resData = Object.assign(res.data.data, {type,resourceName,userName});
        console.log(resData);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: FETCH_STUDY_RES_SUCCESS,
                    payload: resData,
                });
                break;
            default:
                return 0;
        }
    } catch (e) {

    }
}

function *fetchTeacherRes(data) {
    try{
        const {page, type, userName} = data.args;
        let url = `resource/queryResource?page=${page}&type=${type}&userName=${userName}`;
        const res = yield call(Service.get, url);
        console.log(res.data.data);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: FETCH_TEACHER_DATA_SUCCESS,
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
    } catch (e) {
        console.log(e)
    }

}

function *deleteStudyData(args) {
    try{
        const {resourceId, type, userId} = args.args;
        const data = {resourceId, type, userId};
        console.log(data.userId);
        if (data.resourceId !== undefined && data.type !== undefined){
            const res = yield call(Service.post, "resource/delete", data);
            console.log(res);
            switch (res.data.error_code) {
                case 0:
                    yield put({
                        type: DELETE_DATA_SUCCESS
                    });
                    break;
                case -1:
                    openNotification(res.data.message);
                    break;
                case 2:
                    openNotification(res.data.message);
                    break;
                default:
                    openNotification("删除失败");
            }
        }
    }catch (e) {
        console.log(e);
    }
}



export default function *rootResourceSagas() {
    yield takeEvery(FETCH_STUDY_RESOURCE, fetchStudyRes);
    yield takeEvery(FETCH_TEACHER_DATA, fetchTeacherRes);
    yield takeEvery(DELETE_DATA, deleteStudyData);
}