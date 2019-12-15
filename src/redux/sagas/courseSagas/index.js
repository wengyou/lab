import { all } from "redux-saga/effects";
import courseResource from "./courseResource";
import myCourse from "./myCourse";
import handleCourse from "./handleCourse";
import teacherCourse from "./teacherCourse";
import handleTasks from "./handleTasks";

export default function* rootCourseSagas() {
    yield all([
        courseResource(),
        myCourse(),
        handleCourse(),
        handleTasks(),
        teacherCourse(),
    ])
}