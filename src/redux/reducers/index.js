import { combineReducers } from "redux-immutable";
import userMana from "./userMana";
import resource from "./resource";

export default combineReducers({
    userMana,
    resource
})