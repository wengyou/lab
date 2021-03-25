import { fromJS } from "immutable";
import * as constants from "../../../constants/actionTypes";
const defaultState = fromJS({
    labCourses: [],
    labCourseTotal: "",
    addCourseFlag: true,
    deleteCourseFlag: true,
    importCourseFlag: true,
    studentCourses: [],
    studentCourseTotal: "",
    studentCourseFlag: true,
    teacherCourseFlag: true,
});
export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.ADMIN_QUERY_LABCOURSE_SUCCESS:
            return state.merge({
                labCourses: action.payload.items,
                labCourseTotal: action.payload.total,
            });
        case constants.ADMIN_ADD_LABCOURSE_SUCCESS:
            const addCourseFlag = state.toJS().addCourseFlag;
            return state.set(
                "addCourseFlag", !addCourseFlag
            );
        case constants.ADMIN_DELETE_LABCOURSE_SUCCESS:
            const deleteCourseFlag = state.toJS().deleteCourseFlag;
            return state.set(
                "deleteCourseFlag", !deleteCourseFlag
        );
        case constants.ADMIN_IMPORT_LABCOURSE_SUCCESS:
            const importCourseFlag = state.toJS().importCourseFlag;
            return state.set(
                "importCourseFlag", !importCourseFlag
            );
        case constants.ADMIN_QUERY_STUDENTCOURSE_SUCCESS:
            return state.merge({
                studentCourses: action.payload.items,
                studentCourseTotal: action.payload.total,
            });
        case constants.DELETE_STUDENTCOURSE_SUCCESS:
            const studentCourseFlag = state.toJS().studentCourseFlag;
            return state.set(
                "studentCourseFlag", !studentCourseFlag
            );
        case constants.ADMIN_DELETE_TEACHERCOURSES_SUCCESS:
            const teacherCourseFlag = state.toJS().teacherCourseFlag;
            return state.set(
                "teacherCourseFlag", !teacherCourseFlag
            );


        default:
            return state;
    }
};