import { all } from "redux-saga/effects";
import allUser from "./allUser";
import user from "./user";

export default function *rootUserSagas() {
    yield all([
        allUser(),
        user(),
    ])
}
