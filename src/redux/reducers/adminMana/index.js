import { combineReducers } from "redux";
import userManage from './userManage';
import resourceManage from "./resourceManage";
import labCourse from "./labCourse";

export default combineReducers({
    userManage,
    resourceManage,
    labCourse,
})
