import { takeEvery, call, put} from "redux-saga/effects";
import Service from "../../../lib/Service";
import {
    FETCH_SEARCH_VALUE,
    FETCH_SEARCH_VALUE_SUCCESS,
    FETCH_SEARCH_DATA_SUCCESS,
    FETCH_SEARCH_SOFTWARE_SUCCESS,
    FETCH_STUDENT_MESSAGE,
    FETCH_STUDENT_MESSAGE_SUCCESS
} from "../../../constants/actionTypes";
import {openNotification} from "../../../utils/commonFunction";

function *fetchSearchValue($data) {
    try {
        const { page, resourceName, userName, type} = $data.args;
        const res = yield call(
            Service.get,
            `resource/queryResource?page=${page}&type=${type}&userName=${userName}&resourceName=${resourceName}`
        );
        const resData = Object.assign(res.data.data, {type,resourceName,userName});
        switch (res.data.error_code) {
            case 0:
                switch (type) {
                    case "material":
                        yield put({
                            type: FETCH_SEARCH_DATA_SUCCESS,
                            payload: resData,
                        });
                        break;
                    case "software":
                        yield put({
                            type: FETCH_SEARCH_SOFTWARE_SUCCESS,
                            payload: resData,
                        });
                        break;
                    default:
                        return 0
                }
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
        console.error(e)
    }
}

//老师查询学生信息
function *handleSearchStudentMes(args) {
    try{
        const { page, type, userId, userName } = args.args;
        const res = yield call(Service.get,
            `user/userInfo?page=${page}&type=${type}&userId=${userId}&userName=${userName}`);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: FETCH_STUDENT_MESSAGE_SUCCESS,
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
                return 0
        }
    }catch (e) {
        console.log(e)
    }
}

export default function *rootResourceSagas() {
    yield takeEvery(FETCH_SEARCH_VALUE, fetchSearchValue);
    yield takeEvery(FETCH_STUDENT_MESSAGE, handleSearchStudentMes);
}