import { all } from "redux-saga/effects";
import message from "./message";
import addMessage from "./addMessage";

export default function *rootUserSagas() {
    yield all([
        message(),
        addMessage()
    ])
}
