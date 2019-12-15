import * as constants from "../../constants/actionTypes";

export const fetchAdministratorData = args => ({
    type: constants.FETCH_ADMINISTRATOR_DATA,
    args
});
export const fetchNewAdmin = args => ({
    type: constants.FETCH_NEW_ADMIN,
    args
});
export const fetchTeacherData = args => ({
    type: constants.FETCH_TEACHER_RES,
    args
});
export const addNewTeacher = args => ({
    type: constants.ADD_NEW_TEACHER,
    args
});