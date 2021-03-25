import {fromJS} from "immutable";
import * as constants from "../../../constants/actionTypes"

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
    registerTotal: "",
    registerStudent: [],
    teacherName: [],
    studentTotal: "",
    studentMessage: [],
    studentId: "",
    studentName: "",
    page: 1,
    time: Date.now(),
    uploadFlag: true,
    softwareTemp: "",
    resourceTemp: "",
    learningDataTemp: "",
    softwareDataTemp: "",
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
                page: action.payload.page,
            });
            //学习资源下载次数
        case constants.DOWNLOAD_RESOURCE_SUCCESS:
            return state.set("learningDataTemp", new Date());
        case constants.DOWNLOAD_SOFTWARE_SUCCESS:
            return state.set("softwareDataTemp", new Date());
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
                page: action.payload.page,
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
                page: action.payload.page,
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
                page: action.payload.page,
            });
            //关于tab键的切换
        // case constants.CHANGE_TYPE:
        //     // return state.set("type", action.key === '3' ? "material" : "software");
        //     console.log(action.key)
        //     return state.merge({
        //         type: (action.key === '3' && "material") || (action.key === '4' && "software")
        //     })
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
            //删除我的资料
        case constants.DELETE_DATA_SUCCESS:
            return state.set("resourceTemp", new Date());
            //删除我的软件
        case constants.DELETE_SOFTWARE_SUCCESS:
            return state.set("softwareTemp", new Date());
            //上传学习资源
        case constants.FETCH_UPLOAD_DATA_SUCCESS:
            return state.merge({
                time: Date.now(),
                uploadFlag: new Date(),
                resourceTemp: Date.now()
            });
        case constants.NOT_UPLOAD:
            return state.merge({
                uploadFlag: new Date(),
                time: new Date(),
            });
            //上传软件资源
        case constants.FETCH_UPLOAD_SOFTWARE_SUCCESS:
            return state.merge({
                time: Date.now(),
                uploadFlag: new Date(),
                softwareTemp: Date.now()
            });
        //     //老师查询待批准学生
        // case constants.FETCH_QUERY_REGISTER_SUCCESS:
        //     return state.merge({
        //          registerTotal: action.payload.total,
        //          registerStudent: action.payload.items,
        //     });
        //     //老师批准学生
        // case constants.REGISTERED_SUCCESS:
        //     return state.merge({
        //         registerTotal: action.payload.total,
        //         registerStudent: action.payload.items,
        //     });
            //获取全部老师姓名
        case constants.HANDLE_TEACHERRES_SUCCESS:
            return state.merge({
                teacherName: action.payload
            });
        //老师搜索学生信息
        case constants.FETCH_STUDENT_MESSAGE_SUCCESS:
            return state.merge({
                studentTotal: action.payload.total,
                studentMessage: action.payload.items,
                studentId: action.userId,
                studentName: action.userName,
                page: action.payload.page,
                time: Date.now()
            });
        default:
            return state;
    }
}
