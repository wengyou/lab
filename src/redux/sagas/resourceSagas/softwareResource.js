import {takeEvery, put, call} from 'redux-saga/effects';
import Service from "../../../lib/Service";
import {FETCH_SOFTWARE_RES_SUCCESS, FETCH_SOFTWARE_RESOURCE} from "../../../constants/actionTypes";

function* fetchSoftwareRes(data) {
    try {
        const {page, type} = data.args;
        let url;
        if (data.args.resourceName !== null) {
            url = `resource/queryResource?page=${page}&type=${type}&resourceName=${data.args.resourceName}`;
        } else if (data.args.userName !== null) {
            url = `resource/queryResource?page=${page}&type=${type}&userName=${data.args.userName}`;
        } else {
            url = `resource/queryResource?page=${page}&type=${type}`;
        }
        const res = yield call(Service.get, url);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: FETCH_SOFTWARE_RES_SUCCESS,
                    payload: res.data.data
                });
                break;
            default:
                return 0;
        }
    } catch(e) {

    }
}

export default function *rootResourceSagas() {
    yield takeEvery(FETCH_SOFTWARE_RESOURCE, fetchSoftwareRes);
}