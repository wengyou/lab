import { takeEvery, call, put} from "redux-saga/effects";
import {
    FETCH_UPLOAD_RES,
    FETCH_UPLOAD_SUCCESS,
    FETCH_UPLOAD_DATA_SUCCESS,
    FETCH_UPLOAD_SOFTWARE_SUCCESS
} from "../../../constants/actionTypes";
import Service from "../../../lib/Service";
import { openNotification } from "../../../utils/commonFunction";

function *uploadData(args) {
    try{
        const {type, userId, file, userName, page} = args.args;
        const formData = new FormData();
        formData.append("type",type);
        formData.append("userId", userId);
        formData.append("file", file);
        const res = yield call(Service.post, "resource/upload", formData);
        switch (res.data.error_code) {
            case 0:
                const url = `resource/queryResource?page=${page}&type=${type}&userName=${userName}`;
                const $res = yield call(Service.get, url);
                switch (type) {
                    case "material":
                        yield put({
                            type: FETCH_UPLOAD_DATA_SUCCESS,
                            payload: $res.data.data
                        });
                        break;
                    case "software":
                        yield put({
                            type: FETCH_UPLOAD_SOFTWARE_SUCCESS,
                            payload: $res.data.data
                        });
                        break;
                    default:
                        return 0
                }
                openNotification(res.data.message);
                break;
            case -1:
                openNotification(res.data.message);
                break;
            default:
                openNotification("上传失败");
        }
        console.log(res.data);
    }catch (e) {
        console.log(e);
    }
}

export default function *rootResourceSagas() {
    yield takeEvery(FETCH_UPLOAD_RES, uploadData);
}