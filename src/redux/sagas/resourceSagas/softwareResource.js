import {takeEvery, put, call} from 'redux-saga/effects';
import Service from "../../../lib/Service";
import {
    FETCH_SOFTWARE_RES_SUCCESS,
    FETCH_SOFTWARE_RESOURCE,
    FETCH_TEACHER_SOFTWARE,
    FETCH_TEACHER_SOFTWARE_SUCCESS,
    DELETE_SOFTWARE,
    DELETE_SOFTWARE_SUCCESS
} from "../../../constants/actionTypes";
import {openNotification} from "../../../utils/commonFunction";

function* fetchSoftwareRes(data) {
    try {
        let storage = window.localStorage;
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
        console.log(res.data.data);
        storage.softwareResource = JSON.stringify(res.data.data.items);
        storage.total = JSON.stringify(res.data.data.total);
        console.log(storage.softwareResource);
        const resData = Object.assign(res.data.data, {type,resourceName,userName});
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: FETCH_SOFTWARE_RES_SUCCESS,
                    payload: resData,
                    softwareResource: storage.softwareResource,
                    softwareTotal: storage.total,
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
    } catch(e) {

    }
}


function *fetchTeacherSoftwareRes(data) {
    try{
        const {page, type, userName} = data.args;
        let url = `resource/queryResource?page=${page}&type=${type}&userName=${userName}`;
        const res = yield call(Service.get, url);
        console.log(res.data.data);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: FETCH_TEACHER_SOFTWARE_SUCCESS,
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

function *deleteSoftware(args) {
    try{
        const {resourceId, type, userId} = args.args;
        const data = {resourceId, type, userId};
        const res = yield call(Service.post, "resource/delete", data );
        console.log(res.data);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: DELETE_SOFTWARE_SUCCESS
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
    }catch (e) {
        console.log(e)
    }
}

export default function *rootResourceSagas() {
    yield takeEvery(FETCH_SOFTWARE_RESOURCE, fetchSoftwareRes);
    yield takeEvery(FETCH_TEACHER_SOFTWARE, fetchTeacherSoftwareRes);
    yield takeEvery(DELETE_SOFTWARE, deleteSoftware);
}