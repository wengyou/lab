import { fromJS } from "immutable";
import {
    default as constants,
    COUNTER_SUCCESS,
    LOG_OUT,
    LOGIN_SUCCESS,
    PRESERVE_SUCCESS,
    REGISTER_SUCCESS,
    REGISTERED_SUCCESS,
    FETCH_QUERY_REGISTER_SUCCESS,
    FETCH_PARAM_SUCCESS,
    SECRET_GUARD_EXISTENCE_SUCCESS,
    RESET_PASSWARD,
    ADD_QUESTION_SUCCESS,
    CHECK_QUESTION_SUCCESS
} from "../../../constants/actionTypes";

const defaultSate = fromJS({
    login: false,
    userIdentify: "游客",
    name: "",
    userId: "",
    academy:"",
    class: "",
    discipline: "",
    grade:"",
    sex: "",
    type: "",
    phone: "",
    password: "",
    bigOpenKey: sessionStorage.getItem("bigOpenKey"),
    smallOpenKey: sessionStorage.getItem("smallOpenKey"),
    time: Date.now(),
    registerSuccess: false,
    counter: '',
    registeredFlag: "",
    registerTotal: "",
    registerStudent: [],
    pv: '',
    uv: '',
    param: [],
    isQuestion: '',
    resetPasswardData: {},
    isCheck: false,
    modifyPassward: false,
    visible: ''
});

export default (state = defaultSate, action) => {
    switch (action.type) {
        case LOG_OUT:
            return state.merge({
                login: false,
                userIdentify: "游客",
                userId: "",
                academy:"",
                class: "",
                discipline: "",
                grade:"",
                sex: "",
                type: "",
                phone: "",
                bigOpenKey: sessionStorage.setItem("bigOpenKey", "1"),
                time: Date.now()
            });
        case LOGIN_SUCCESS:
            return state.merge({
                login: true,
                userIdentify:action.payload.id,
                name: action.payload.name,
                userId: action.payload.userId,
                academy: action.payload.academy,
                class: action.payload.cls,
                discipline: action.payload.discipline,
                grade: action.payload.grade,
                sex: action.payload.sex,
                type: action.payload.type,
                phone: action.payload.phone,
                password: action.payload.password,
                bigOpenKey: sessionStorage.setItem("bigOpenKey", "1"),
                time: Date.now(),
            });
        case RESET_PASSWARD:
            return state.merge({
                resetPasswardData: action.payload,
                modifyPassward: true,
            })
        case SECRET_GUARD_EXISTENCE_SUCCESS:
            return state.merge({
                isQuestion: action.payload,
                modifyPassward: true
            })
        case ADD_QUESTION_SUCCESS:
            return state.merge({
                isQuestion: true
            })
        case CHECK_QUESTION_SUCCESS: 
            return state.merge({
                isCheck: true,
                visible: new Date(),
                login: true,
                userIdentify: (action.payload.type == 'student' && '学生') || (action.payload.type == 'teacher' && '教师') || (action.payload.type == 'admin' && '超级管理员'),
                name: action.payload.userName,
                userId: action.payload.userId,
                academy: action.payload.academy,
                class: action.payload.cls,
                discipline: action.payload.discipline,
                grade: action.payload.grade,
                sex: action.payload.sex,
                type: action.payload.type,
                phone: action.payload.phone,
                password: action.payload.password,
                bigOpenKey: sessionStorage.setItem("bigOpenKey", "1"),
            })
        case REGISTER_SUCCESS:
            return state.merge({
                registerSuccess: true,
            });
        case PRESERVE_SUCCESS:
            return state.merge({
                login: true,
                name: action.payload.userName,
                userId: action.payload.userId,
                academy: action.payload.academy,
                class: action.payload.class,
                discipline: action.payload.discipline,
                grade: action.payload.grade,
                sex: action.payload.sex,
                type: action.payload.type,
                phone: action.payload.phone,
                password: action.payload.password,
                visible: new Date()
            });
        case COUNTER_SUCCESS:
            return state.merge({
                counter: action.payload
            });
        case FETCH_PARAM_SUCCESS:
            return state.merge({
                pv: action.payload[6].keyValue,
                uv: action.payload[7].keyValue,
                param: action.payload
            });
        //老师查询待批准学生
        case FETCH_QUERY_REGISTER_SUCCESS:
            return state.merge({
                registerTotal: action.payload.total,
                registerStudent: action.payload.items,
            });
        //老师批准学生
        // case constants.REGISTERED_SUCCESS:
        //     return state.merge({
        //         registerTotal: action.payload.total,
        //         registerStudent: action.payload.items,
        //     });
        case REGISTERED_SUCCESS:
            return state.set("registeredFlag", new Date());
        default:
            return state;
    }
}
