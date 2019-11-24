import { all } from "redux-saga/effects";
import studyResource from "./studyResource";
import softwareResource from "./softwareResource";
import loadResource from "./loadResource";

export default function *rootResourceSagas() {
    yield all([
        studyResource(),
        softwareResource(),
        loadResource()
    ])
}