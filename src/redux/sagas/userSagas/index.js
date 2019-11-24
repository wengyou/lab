import { all } from "redux-saga/effects";
import student from "./student";

export default function *rootUserSagas() {
    yield all([
        student()
    ])
}
