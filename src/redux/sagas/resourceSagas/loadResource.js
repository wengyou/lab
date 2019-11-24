import {takeEvery, put, call} from 'redux-saga/effects';
import Service from "../../../lib/Service";
import {FETCH_LOAD_RESOURCE_SUCCESS, MATERIAL_LOAD} from "../../../constants/actionTypes";

function *fetchLoadRes(data) {
    const { resourceName, type} = data.args;
    let url = `resource/download?resourceName=${resourceName}&type=${type}`;
    const res = yield call(Service.post,url);
    switch (res.data.error_code) {
        case 0:
            yield put({
                type: FETCH_LOAD_RESOURCE_SUCCESS,
                loadUrl: res.data.data
            });
            break;
        default:
            return 0;
    }

}
export default function *rootResourceSagas() {
    yield takeEvery(MATERIAL_LOAD, fetchLoadRes);
}