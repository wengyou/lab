// import { takeEvery, put, call } from "redux-saga/effects";
//
// import {
//     QUERY_COURSE_TASK,
//     QUERY_COURSE_TASK_SUCCESS
// } from "../../../constants/actionTypes";
//
// import Service from "../../../lib/Service";
//
// function* queryCourseRes(data) {
//     try {
//         const {teacherCourseId, taskResource} = data.teacherCourseId;
//         let url = `course/queryCourseTask?teacherCourseId=${teacherCourseId}`;
//         const res = yield call(Service.get, url);
//         switch (res.data.error_code) {
//             case 0:
//                 yield put({
//                     type:QUERY_COURSE_TASK_SUCCESS,
//                     payload: res.data.data,
//                     teacherCourseId,
//                     taskResource
//                 });
//                 break;
//             default:
//                 return 0;
//         }
//     }
//     catch (e) {
//
//     }
// }
//
// export default function* rootCourseSaga() {
//     yield takeEvery(QUERY_COURSE_TASK, queryCourseRes)
// }