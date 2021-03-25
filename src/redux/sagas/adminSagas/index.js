import { all } from "redux-saga/effects";
import addMessage from "./userManage";
import resourceManage from "./resourceManage";
import rootLabCourse from "./labCourse";
import rootClearDataSaga from "./dataMana";
import rootAnnounceSaga from "./labAnnounce";

export default function *rootUserSagas() {
    yield all([
        addMessage(),
        resourceManage(),
        rootLabCourse(),
        rootClearDataSaga(),
        rootAnnounceSaga()
    ])
}
