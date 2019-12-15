import { fromJS } from "immutable";
import {LOG_OUT, LOGIN_SUCCESS, PRESERVE_SUCCESS} from "../../../constants/actionTypes";

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
            });
        case LOGIN_SUCCESS:
            return state.merge({
                login: true,
                userIdentify: action.payload.id,
                name: action.payload.name,
                userId: action.payload.userId,
                academy: action.payload.academy,
                class: action.payload.class,
                discipline: action.payload.discipline,
                grade: action.payload.grade,
                sex: action.payload.sex,
                type: action.payload.type,
                phone: action.payload.phone,
                password: action.payload.password
            });
        case PRESERVE_SUCCESS:
            return state.merge({
                name: action.payload.userName,
                userId: action.payload.userId,
                academy: action.payload.academy,
                class: action.payload.class,
                discipline: action.payload.discipline,
                grade: action.payload.grade,
                sex: action.payload.sex,
                type: action.payload.type,
                phone: action.payload.phone,
                password: action.payload.password
            });
        default:
            return state;
    }
}