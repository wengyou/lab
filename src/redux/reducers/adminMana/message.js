import { fromJS } from "immutable";
import {
    ADD_NEW_TEACHER_SUCCESS,
    FETCH_ADMINISTRATOR_DATA_SUCCESS,
    FETCH_TEACHER_RES_SUCCESS,
} from "../../../constants/actionTypes";

const defaultState = fromJS({
    adminData: [],
    adminTeacherData: [],
    total: ""
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_ADMINISTRATOR_DATA_SUCCESS:
            return state.merge({
                adminData: action.payload
            });
        case FETCH_TEACHER_RES_SUCCESS:
            return state.merge({
                adminTeacherData: action.payload.items,
                total: action.payload.total
            });
        case ADD_NEW_TEACHER_SUCCESS:
            return state.merge({
                adminTeacherData: action.payload
            });
        default:
            return state;

    }
}
