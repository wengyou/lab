import { fromJS } from "immutable";
import * as constants from "../../../constants/actionTypes";


const defaultState = fromJS({
    handleHomework: [],
    teacher: [],
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.QUERY_HOMEWORK_OK:
            return state.set("handleHomework", action.payload);
        case constants.HANDLE_TEACHERRES_SUCCESS:
            return state.merge({
                teacher: action.payload
            });
        default:
            return state;
    }
}
