import {takeEvery, put, call} from "redux-saga/effects";
import { QUERY_ANNOUNCE, QUERY_ANNOUNCE_SUCCESS } from "../../../constants/actionTypes";
import Service from "../../../lib/Service";

function* queryAnnounceRes(data) {
    try {
        const {page, rows} = data.page;
        let url = `queryAnnounce?page=${page}&rows=${rows}`;
        const res = yield call(Service.get, url);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: QUERY_ANNOUNCE_SUCCESS,
                    payload: res.data.data
                });
                break;
            default:
                return 0;
        }
    }
    catch (e) {

    }
}
export default function* rootAnnounceSagas() {
    yield takeEvery(QUERY_ANNOUNCE, queryAnnounceRes)
}
