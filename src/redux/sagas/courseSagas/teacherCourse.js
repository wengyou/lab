//获取教师的课程列表
import { takeEvery, put, call } from "redux-saga/effects";
import {
    TEACHER_QUERY_COURSE,
    TEACHER_QUERY_COURSE_SUCCESS
} from "../../../constants/actionTypes";
import Service from "../../../lib/Service";

function* queryTeacherCourse(data) {
    try{
        const { page, userId } = data.args;
        const url = `course/allCourse?page=${page}&userId=${userId}`;
        const res = yield call(Service.get, url);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: TEACHER_QUERY_COURSE_SUCCESS,
                    payload: res.data.data
                });
                break;
            default:
                return 0;
        }
    }
    catch(e){

    }
}
export default function* rootTeacherCourse() {
    yield takeEvery(TEACHER_QUERY_COURSE, queryTeacherCourse)
}
