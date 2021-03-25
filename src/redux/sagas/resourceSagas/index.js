import { all } from "redux-saga/effects";
import studyResource from "./studyResource";
import softwareResource from "./softwareResource";
import search from  "./search";
import upload from "./upload";

export default function *rootResourceSagas() {
    yield all([
        studyResource(),
        softwareResource(),
        search(),
        upload(),
    ])
}