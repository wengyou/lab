import { combineReducers } from "redux-immutable";
import userMana from "./userMana";
import resource from "./resource";
import announce from "./announce";
import course from "./course";
import admin from "./adminMana";

export default combineReducers({
    userMana,
    resource,
    announce,
    course,
    admin
})