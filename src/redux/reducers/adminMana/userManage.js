import { fromJS } from "immutable";
import * as constants from "../../../constants/actionTypes"

const defaultState = fromJS({
    adminData: [],
    adminTeacherData: [],
    adminStudentData: [],
    adminRegisterUserData: [],
    adminTotal: "",
    registerUserTotal: "",
    studentTotal: "",
    teacherTotal: "",
    temp: '',
    addTeacherFlag: true,
    addAdminFlag: true,
    addStudentFlag: true,
    modifyAdminTemp: '',
    modifyTeacherTemp: '',
    modifyStudentTemp: '',
    teacherPage: "",
    studentPage: "",
    studentSearchFlag: false,
    teacherSearchFlag: false,
    paramSystem: [],
    addVisible: false,
});

export default (state = defaultState, action) => {
    switch (action.type) {
        //获取注册用户信息
        case constants.FETCH_REGISTER_DATA_SUCCESS:
            return state.merge({
                adminRegisterUserData: action.payload.items,
                registerUserTotal: action.payload.total
            });
            //批量授权
        case constants.AGREE_REGISTER_SUCCESS:
            return state.set("temp", new Date());
        //获取学生数据
        case constants.FETCH_STUDENT_DATA_SUCCESS:
            return state.merge({
                adminStudentData: action.payload.items,
                studentTotal: action.payload.total,
                studentPage: action.payload.page,
            });
            //添加学生
        case constants.ADD_NEW_STUDENT_SUCCESS:
            const {payloadS, newDataS } = action;
            const dataS = [newDataS, ...payloadS];
            dataS.pop();
            return state.merge({
                adminStudentData: dataS,
                addStudentFlag: false,
                addVisible: false
            });
            //删除学生
        case constants.DELETE_STUDENT_SUCCESS:
            return state.set("temp",new Date());
            //导入学生
        case constants.IMPORT_USER_success:
            return state.set("temp", new Date());
            //修改学生
        case constants.MODIFY_STUDENT_SUCCESS:
            return state.set("modifyStudentTemp", new Date());
            //搜索学生
        case constants.SEARCH_STUDENT_SUCCESS:
            return state.merge({
                adminStudentData: action.payload.items,
                studentTotal: action.payload.total,
                studentPage: action.payload.page,
                studentSearchFlag: true
            });
        //获取管理员数据
        case constants.FETCH_ADMINISTRATOR_DATA_SUCCESS:
            return state.merge({
                adminData: action.payload.items,
                adminTotal: action.payload.total
            });
            //添加管理员信息
        case constants.ADD_NEW_ADMIN_SUCCESS:
            const { payloadA, newDataA } = action;
            const dataA = [newDataA, ...payloadA];
            dataA.pop();
            return state.merge({
                adminData: dataA,
                addAdminFlag: false,
                addVisible:false
            });
            //修改管理员信息
        case constants.MODIFY_ADMIN_SUCCESS:
            return state.set("modifyAdminTemp", new Date());
            //获取老师数据
        case constants.FETCH_TEACHER_RES_SUCCESS:
            return state.merge({
                adminTeacherData: action.payload.items,
                teacherTotal: action.payload.total,
                teacherPage: action.payload.page
            });
            //添加老师
        case constants.ADD_NEW_TEACHER_SUCCESS:
            const { payload, newData } = action;
            const data = [newData, ...payload];
            data.pop();
            return state.merge({
                adminTeacherData: data,
                addTeacherFlag: false
            });
            //修改教师信息
        case constants.MODIFY_TEACHER_SUCCESS:
            return state.set("modifyTeacherTemp", new Date());
            //搜索老师
        case constants.SEARCH_TEACHER_SUCCESS:
            return state.merge({
                adminTeacherData: action.payload.items,
                teacherTotal: action.payload.total,
                teacherPage: action.payload.page,
                teacherSearchFlag: true
            });
            //删除老师
        case constants.DELETE_TEACHER_SUCCESS:
            return state.set("temp",new Date());
            //删除注册用户
        case constants.DELETE_REGISTER_USER_SUCCESS:
            return state.set("temp", new Date());
            //获取系统参数
        case constants.FETCH_PARAM_SUCCESS:
            return state.merge({
                paramSystem: action.payload
            });
        default:
            return state;

    }
}
