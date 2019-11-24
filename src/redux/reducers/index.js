import { combineReducers } from "redux-immutable";
import userMana from "./userMana";
import resource from "./resource";
import announce from "./announce";

export default combineReducers({
    userMana,
    resource,
    announce,
})