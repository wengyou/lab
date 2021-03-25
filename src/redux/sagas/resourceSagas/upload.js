import { takeEvery, call, put} from "redux-saga/effects";
import {
    FETCH_UPLOAD_RES,
    FETCH_UPLOAD_DATA_SUCCESS,
    FETCH_UPLOAD_SOFTWARE_SUCCESS,
    NOT_UPLOAD
} from "../../../constants/actionTypes";
import Service from "../../../lib/Service";
import { openNotification } from "../../../utils/commonFunction";

function *uploadData(args) {
    try{
        const {type, userId, file} = args.args;
        const formData = new FormData();
        formData.append("type",type);
        formData.append("userId", userId);
        formData.append("file", file);
        const res = yield call(Service.post, "resource/upload", formData);
        switch (res.data.error_code) {
            case 0:
                switch (type) {
                    case "material":
                        yield put({
                            type: FETCH_UPLOAD_DATA_SUCCESS,
                        });
                        break;
                    case "software":
                        yield put({
                            type: FETCH_UPLOAD_SOFTWARE_SUCCESS,
                        });
                        break;
                    default:
                        return 0
                }
                openNotification(res.data.message);
                break;
            case -1:
                yield put({
                    type: NOT_UPLOAD
                });
                openNotification(res.data.message);
                break;
            case 1:
                yield put({
                    type: NOT_UPLOAD
                });
                openNotification(res.data.message);
                break;
            case 2:
                yield put({
                    type: NOT_UPLOAD
                });
                openNotification(res.data.message);
                break;
            default:
                openNotification("上传失败");
        }
    }catch (e) {
        console.log(e);
    }
}

export default function *rootResourceSagas() {
    yield takeEvery(FETCH_UPLOAD_RES, uploadData);
}
