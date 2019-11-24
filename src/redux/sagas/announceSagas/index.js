import { all } from "redux-saga/effects";
import announceSource from "./announceSaga";

export default function *rootAnnounceSagas() {
    yield all([
        announceSource()
    ])
}