import * as constants from "../../constants/actionTypes";

export const fetchAdministratorData = args => ({
    type: constants.FETCH_ADMINISTRATOR_DATA,
    args
});
export const addNewAdmin = args => ({
    type: constants.ADD_NEW_ADMIN,
    args
});
export const modifyAdmin = args => ({
    type: constants.MODIFY_ADMIN,
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
export const deleteTeacher = args => ({
    type: constants.DELETE_TEACHER,
    args
});
export const modifyTeacher = args => ({
    type: constants.MODIFY_TEACHER,
    args
});
export const searchTeacher = args => ({
    type: constants.SEARCH_TEACHER,
    args
});
export const fetchStudentData = args => ({
    type: constants.FETCH_STUDENT_DATA,
    args
});
export const addNewStudent = args => ({
    type: constants.ADD_NEW_STUDENT,
    args
});
export const deleteStudent = args => ({
    type: constants.DELETE_STUDENT,
    args
});
export const modifyStudent = args => ({
    type: constants.MODIFY_STUDENT,
    args
});
export const searchStudent = args => ({
    type: constants.SEARCH_STUDENT,
    args
});
export const importUser = args => ({
    type: constants.IMPORT_USER,
    args
});
export const fetchRegisterUserData = args => ({
    type: constants.FETCH_REGISTER_DATA,
    args
});
export const agreeRegister = args => ({
    type: constants.AGREE_REGISTER,
    args
});
export const deleteRegisterUser = args => ({
    type: constants.DELETE_REGISTER_USER,
    args
});
export const fetchAdminResourceData = args => ({
    type: constants.FETCH_ADMIN_RESOURCE_DATA,
    args
});
export const deleteResourceData = args => ({
    type: constants.DELETE_RESOURCE_DATA,
    args
});
export const importResource = args => ({
    type: constants.IMPORT_RESOURCE,
    args
});
export const fetchAdminSoftwareData = args => ({
    type: constants.FETCH_ADMIN_SOFTWARE_DATA,
    args
});
export const deleteSoftwareData = args => ({
    type: constants.DELETE_SOFTWARE_DATA,
    args
});
export const searchResourceData = args => ({
    type: constants.SEARCH_RESOURCE_DATA,
    args
});
export const searchSoftwareData = args => ({
    type: constants.SEARCH_SOFTWARE_DATA,
    args
});
export const importSoftware = args => ({
    type: constants.IMPORT_SOFTWARE,
    args
});
export const modifyParam = args => ({
    type: constants.MODIFY_PARAM,
    args
})
//重置密码
export const resetPassword = args => ({
    type: constants.RESET_PASSWORD,
    args
})


//morning
export const adminQueryLabCourse = args => ({
    type: constants.ADMIN_QUERY_LABCOURSE,
    args,
});
export const adminClearData = () => ({
    type: constants.ADMIN_CLEAR_DATA
});
export const releaseAnnounce = args => ({
    type: constants.ADMIN_RELEASE_ANNOUNCE,
    args,
});
export const deleteAnnounce = announceId => ({
    type: constants.ADMIN_DELETE_ANNOUNCE,
    announceId
});
export const addLabCourse = args => ({
    type: constants.ADMIN_ADD_LABCOURSE,
    args
});
export const deleteLabCourse = args => ({
    type: constants.ADMIN_DELETE_LABCOURSE,
    args
});
export const importLabCourse = args => ({
    type: constants.ADMIN_IMPORT_LABCOURSE,
    args
});
export const updateLabCourse = args => ({
    type: constants.ADMIN_UPDATE_LABCOURSE,
    args
});
export const queryStudentCourse = args =>({
    type : constants.ADMIN_QUERY_STUDENTCOURSE,
    args
});
export const deleteStudentCourse = args =>({
    type: constants.DELETE_STUDENTCOURSE,
    args
});
export const deleteTeacherCourses= args =>({
    type: constants.ADMIN_DELETE_TEACHERCOURSES,
    args
});
export const editAnnounce= args =>({
    type: constants.ADMIN_EDIT_ANNOUNCE,
    args
});
