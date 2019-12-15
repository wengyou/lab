import { takeEvery, put, call } from "redux-saga/effects";

import {
    QUERY_COURSE,
    QUERY_COURSE_RES_SUCCESS,
    FETCH_SEARCH_COURSE_SUCCESS,
    FETCH_SEARCH_COURSE
} from "../../../constants/actionTypes";
import {openNotification} from "../../../utils/commonFunction"
import Service from "../../../lib/Service";
//获取所有课程，用于学生添加课程那个
function* queryCourseRes(data) {
    try {
        const {page, userId} = data.args;
        let url = `course/queryCourse?page=${page}&userId=${userId}`;
        const res = yield call(Service.get, url);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type:QUERY_COURSE_RES_SUCCESS,
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

function *handleSearchCourse(data) {
    const { page, teacherName, course, userId} = data.args;
    const url = `course/queryCourse?page=${page}&teacherName=${teacherName}&course=${course}&userId=${userId}`;
    const res = yield call(Service.get, url);
    console.log(res.data);
    switch (res.data.error_code) {
        case 0:
            yield put({
                type: FETCH_SEARCH_COURSE_SUCCESS,
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
}

export default function* rootCourseSaga() {
    yield takeEvery(QUERY_COURSE, queryCourseRes);
    yield takeEvery(FETCH_SEARCH_COURSE, handleSearchCourse);
}