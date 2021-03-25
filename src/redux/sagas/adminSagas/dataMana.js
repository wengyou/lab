import { takeEvery, put, call } from "redux-saga/effects";
import Service from "../../../lib/Service";
import {
    ADMIN_CLEAR_DATA,
    MODIFY_PARAM,
    MODIFY_PARAM_SUCCESS
} from "../../../constants/actionTypes";
import {message} from "antd";
import { openNotification} from "../../../utils/commonFunction";

function *clearData() {
    const res = yield call(Service.post, `admin/clearData`);
    switch (res.data.error_code) {
        case 0 :
            message.success("清除成功~");
            break;
        case -1:
            message.error("清除失败！");
        default:
            return 0;
    }

}

function *modifyParam(args) {
    const res = yield call(Service.post, 'system/updateParameters', args.args);
    switch (res.data.error_code) {
        case 0:
            yield put({
                type: MODIFY_PARAM_SUCCESS,
                payload: res.data.data
            });
            openNotification('修改成功');
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

export default function* rootClearDataSaga() {
    yield takeEvery(ADMIN_CLEAR_DATA, clearData);
    yield takeEvery(MODIFY_PARAM, modifyParam);
}
