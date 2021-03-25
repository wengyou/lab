import { takeEvery, call, put } from "redux-saga/effects";
import {
    QUERY_MY_COURSE,
    QUERY_MY_COURSE_SUCCESS
} from "../../../constants/actionTypes";
import Service from "../../../lib/Service";

//老师和学生的我的任务界面
function* queryMyCourseRes(data) {
    try{
        let { userId, type } = data.args;
        let url = `course/queryMyCourse?userId=${userId}&type=${type}`;
        const res = yield call(Service.get, url);
        switch(res.data.error_code){
            case 0:
            yield put({
                type: QUERY_MY_COURSE_SUCCESS,
                payload: res.data.data,
            });
                break;
            default:
                return 0;
        }
    }
    catch (e) {
    }
}
export default function* rootMyCourse() {
    yield takeEvery(QUERY_MY_COURSE, queryMyCourseRes)
}
