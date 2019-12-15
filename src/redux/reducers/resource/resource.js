import {fromJS} from "immutable";
import * as constants from "../../../constants/actionTypes"
import {HANDLE_TEACHERRES_SUCCESS} from "../../../constants/actionTypes";

const defaultState = fromJS({
    studyResource: [],
    softwareResource:[],
    searchFlag: false,
    allSoftwareTotal: "",
    allLearningTotal: "",
    mySoftwareTotal: "",
    myLearningTotal: "",
    searchTotal: "",
    type: "",
    resourceName: "",
    //上传人名字
    userName: "",
    teacherData: [],
    teacherSoftware: [],
    studentTotal: "",
    studentMessage: [],
    registerTotal: "",
    registerStudent: [],
    upLoading: false,
    teacherName: [],
});

export default (state = defaultState, action) => {
    switch (action.type) {
        //获取学习资源
        case constants.FETCH_STUDY_RES_SUCCESS:
            //merge：浅合并，新数据与旧数据对比，旧数据中不存在的属性直接添加，旧数据中已存在的属性用新数据中的覆盖
            return state.merge({
                searchFlag: false,
                allLearningTotal: action.payload.total,
                studyResource: action.payload.items,
                type: action.payload.type,
                resourceName: action.payload.resourceName,
                userName: action.payload.userName,
            });
            //获取软件资源
        case constants.FETCH_SOFTWARE_RES_SUCCESS:
            return state.merge({
                storageSoftwareRes: JSON.parse(action.softwareResource),
                storageSoftwareTotal: JSON.parse(action.softwareTotal),
                allSoftwareTotal: action.payload.total,
                softwareResource: action.payload.items,
                type: action.payload.type,
                resourceName: action.payload.resourceName,
                userName: action.payload.userName,
            });
            //下载软件
        case constants.FETCH_LOAD_RESOURCE_SUCCESS:
            return state.merge({
                learningUrl: action.loadUrl
            });
            //搜索学习资源
        case constants.FETCH_SEARCH_DATA_SUCCESS:
            return state.merge({
                searchFlag: true,
                allLearningTotal: action.payload.total,
                studyResource: action.payload.items,
                type: action.payload.type,
                resourceName: action.payload.resourceName,
                userName: action.payload.userName,
            });
            //搜索软件资源
        case constants.FETCH_SEARCH_SOFTWARE_SUCCESS:
            return state.merge({
                searchFlag: true,
                allSoftwareTotal: action.payload.total,
                type: action.payload.type,
                resourceName: action.payload.resourceName,
                userName: action.payload.userName,
                softwareResource: action.payload.items,
            });
            //关于tab键的切换
        case constants.CHANGE_TYPE:
            return state.set("type", action.key === '3' ? "material" : "software");
            //获取老师学习资源
        case  constants.FETCH_TEACHER_DATA_SUCCESS:
            return state.merge({
                myLearningTotal: action.payload.total,
                teacherData: action.payload.items,
            });
            //获取老师软件资源
        case  constants.FETCH_TEACHER_SOFTWARE_SUCCESS:
            return state.merge({
                mySoftwareTotal: action.payload.total,
                teacherSoftware: action.payload.items,
            });
            //删除软件
        case constants.DELETE_SOFTWARE_SUCCESS:
            return state.merge({

            });
            //上传学习资源
        case constants.FETCH_UPLOAD_DATA_SUCCESS:
            return state.merge({
                teacherData: action.payload.items,
                myLearningTotal: action.payload.total,
            });
            //上传软件资源
        case constants.FETCH_UPLOAD_SOFTWARE_SUCCESS:
            return state.merge({
                teacherSoftware: action.payload.items,
                mySoftwareTotal: action.payload.total,
                upLoading: false
            });
        case constants.FETCH_STUDENT_MESSAGE_SUCCESS:
            return state.merge({
                studentTotal: action.payload.total,
                studentMessage: action.payload.items
            });
            //老师查询待批准学生
        case constants.FETCH_QUERY_REGISTER_SUCCESS:
            return state.merge({
                 registerTotal: action.payload.total,
                 registerStudent: action.payload.items,
            });
            //获取全部老师姓名
        case constants.HANDLE_TEACHERRES_SUCCESS:
            return state.merge({
                teacherName: action.payload
            });
        default:
            return state;
    }
}