import { takeEvery, call, put} from "redux-saga/effects";
import Service from "../../../lib/Service";

function *fetchResourceNameRes(data) {
    try {
        const [ page, type ] = data.args;
        let url;
        if (data.args.resourceName !== null) {
            url = `resource/queryResource?page=${page}&type=${type}&resourceName=${data.args.resourceName}`;
        } else if (data.args.userName !== null) {
            url = `resource/queryResource?page=${page}&type=${type}&userName=${data.args.userName}`;
        } else {
            url = `resource/queryResource?page=${page}&type=${type}`;
        }
        const res = yield call(Service.get, url);

    } catch (e) {
        console.log(e);
    }
}