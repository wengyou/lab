import { takeEvery, call, put } from "redux-saga/effects";
import Service from "../../../lib/Service";
import {
    FETCH_ADMIN_RESOURCE_DATA,
    FETCH_ADMIN_RESOURCE_DATA_SUCCESS,
    FETCH_ADMIN_SOFTWARE_DATA,
    FETCH_ADMIN_SOFTWARE_DATA_SUCCESS,
    SEARCH_RESOURCE_DATA,
    SEARCH_RESOURCE_DATA_SUCCESS,
    SEARCH_SOFTWARE_DATA,
    SEARCH_SOFTWARE_DATA_SUCCESS,
    DELETE_RESOURCE_DATA,
    DELETE_RESOURCE_DATA_SUCCESS,
    DELETE_SOFTWARE_DATA,
    DELETE_SOFTWARE_DATA_SUCCESS,
    IMPORT_RESOURCE,
    IMPORT_RESOURCE_SUCCESS,
    IMPORT_SOFTWARE,
    IMPORT_SOFTWARE_SUCCESS
} from "../../../constants/actionTypes";
import {openNotification} from "../../../utils/commonFunction";

//获取学习资料
function *fetchResourceData(data) {
    try {
        const {page, type } = data.args;
        const res = yield call(Service.get, `resource/queryResource?page=${page}&type=${type}`);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: FETCH_ADMIN_RESOURCE_DATA_SUCCESS,
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
    }catch (e) {
        console.log(e);
    }
}
//删除学习资料
function *deleteResource(args) {
    try {
        const {list, type, userId } = args.args;
        let formData = new FormData();
        formData.append('resourceIdList',list);
        const resourceIdList = formData.get('resourceIdList');
        const data = {resourceIdList, type, userId };
        const res = yield call(Service.post, "resource/delete", data);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: DELETE_RESOURCE_DATA_SUCCESS
                });
                openNotification(res.data.message);
                break;
            case -1:
                openNotification(res.data.data);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return 0;
        }
    }catch (e) {
        console.log(e);
    }
}
//搜索学习资料
function *searchResource(args) {
    try {
            const {page, value, type, flag } = args.args;
            let url;
            if (flag === "resourceName"){
                url = `resource/queryResource?page=${page}&resourceName=${value}&type=${type}`;
            } else {
                url = `resource/queryResource?page=${page}&userName=${value}&type=${type}`;
            }
            const res = yield call(Service.get, url);
            switch (res.data.error_code) {
                case 0:
                    yield put({
                        type: SEARCH_RESOURCE_DATA_SUCCESS,
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
    }catch (e) {
        console.log(e);
    }
}
//导入学习资料
function *importResourceData(args) {
    try {
        const {type, userId, file} = args.args;
        const formData = new FormData();
        formData.append("type", type);
        formData.append("userId", userId);
        formData.append("file", file);
        const res = yield call(Service.post, "resource/upload", formData);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: IMPORT_RESOURCE_SUCCESS,
                    payload: res.data.data
                });
                openNotification(res.data.message);
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
        console.log(e);
    }
}
//搜索软件
function *searchSoftware(args) {
    try {
        const {page, value, type, flag } = args.args;
        let url;
        if (flag === "softwareName"){
            url = `resource/queryResource?page=${page}&resourceName=${value}&type=${type}`;
        } else {
            url = `resource/queryResource?page=${page}&userName=${value}&type=${type}`;
        }
        const res = yield call(Service.get, url);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: SEARCH_SOFTWARE_DATA_SUCCESS,
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
    }catch (e) {
        console.log(e);
    }
}
//获取软件
function *fetchSoftwareData(data) {
    try {
        const {page, type } = data.args;
        const res = yield call(Service.get, `resource/queryResource?page=${page}&type=${type}`);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: FETCH_ADMIN_SOFTWARE_DATA_SUCCESS,
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
    }catch (e) {
        console.log(e);
    }
}
//删除软件
function *deleteSoftware(args) {
    try {
        const {list, type, userId } = args.args;
        let formData = new FormData();
        formData.append('resourceIdList',list);
        const resourceIdList = formData.get('resourceIdList');
        const data = {resourceIdList, type, userId };
        const res = yield call(Service.post, "resource/delete", data);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: DELETE_SOFTWARE_DATA_SUCCESS
                });
                openNotification(res.data.message);
                break;
            case -1:
                openNotification(res.data.data);
                break;
            case 2:
                openNotification(res.data.message);
                break;
            default:
                return 0;
        }
    }catch (e) {
        console.log(e);
    }
}
//导入软件
function *importSoftwareData(args) {
    try {
        const {type, userId, file} = args.args;
        const formData = new FormData();
        formData.append("type", type);
        formData.append("userId", userId);
        formData.append("file", file);
        const res = yield call(Service.post, "resource/upload", formData);
        switch (res.data.error_code) {
            case 0:
                yield put({
                    type: IMPORT_SOFTWARE_SUCCESS,
                    payload: res.data.data
                });
                openNotification(res.data.message);
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
        console.log(e);
    }
}

export default function *rootAdminSagas() {
    yield takeEvery(FETCH_ADMIN_RESOURCE_DATA, fetchResourceData);
    yield takeEvery(FETCH_ADMIN_SOFTWARE_DATA, fetchSoftwareData);
    yield takeEvery(SEARCH_RESOURCE_DATA, searchResource);
    yield takeEvery(SEARCH_SOFTWARE_DATA, searchSoftware);
    yield takeEvery(DELETE_RESOURCE_DATA, deleteResource);
    yield takeEvery(DELETE_SOFTWARE_DATA, deleteSoftware);
    yield takeEvery(IMPORT_RESOURCE, importResourceData);
    yield takeEvery(IMPORT_SOFTWARE, importSoftwareData);
}
