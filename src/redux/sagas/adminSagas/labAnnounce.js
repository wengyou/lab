import { takeEvery, put, call } from "redux-saga/effects";
import Service from "../../../lib/Service";
import { message } from "antd";
import {
    ADMIN_RELEASE_ANNOUNCE,
    ADMIN_RELEASE_ANNOUNCE_SUCCESS,
    ADMIN_EDIT_ANNOUNCE,
    ADMIN_EDIT_ANNOUNCE_SUCCESS,
    ADMIN_DELETE_ANNOUNCE,
    ADMIN_DELETE_ANNOUNCE_SUCCESS,
} from "../../../constants/actionTypes";

function *releaseAnnounce(args) {
    try {
        const {userName, title, content, file} = args.args;
        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('file', file);
        const res = yield call(Service.post, `admin/addAnnounce`, formData);
        switch (res.data.error_code) {
            case 0:
                message.success("发布成功~");
                yield put({
                    type: ADMIN_RELEASE_ANNOUNCE_SUCCESS,
                });
                break;
            case -1:
                message.error("发布失败, 该文件已存在！");
                break;
            case 1:
                message.error("权限不足！");
                break;
            default:
                return 0;
        }
    }
    catch (e) {

    }
}
function *editAnnounce(args) {
    try {
        const {userName, title, content, file, announceId} = args.args;
        const formData = new FormData();
        formData.append('userName', userName);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('file', file);
        formData.append('announceId', announceId);
        const res = yield call(Service.post, `admin/updateAnnounce`, formData);
        switch (res.data.error_code) {
            case 0:
                message.success("修改成功~");
                yield put({
                    type: ADMIN_EDIT_ANNOUNCE_SUCCESS,
                });
                break;
            case -1:
                message.error("修改失败！");
                break;
            case 1:
                message.error("权限不足！");
                break;
            default:
                return 0;
        }
    }
    catch (e) {

    }
}
function* deleteAnnounce(arg) {
    try {
        const {announceId} = arg.announceId;
        const formData = new FormData;
        formData.append("announceId", announceId );

        const res = yield call(Service.post, `admin/deleteAnnounce`, formData);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: ADMIN_DELETE_ANNOUNCE_SUCCESS,
                });
                message.success(res.data.message);
                break;
            case -1:
                message.error("删除失败！");
                break;
            default:
                return 0;
        }
    }
    catch(e){

    }
}

export default function* rootAnnounceSaga() {
    yield takeEvery(ADMIN_RELEASE_ANNOUNCE, releaseAnnounce);
    yield takeEvery(ADMIN_DELETE_ANNOUNCE, deleteAnnounce);
    yield takeEvery(ADMIN_EDIT_ANNOUNCE, editAnnounce);
}
