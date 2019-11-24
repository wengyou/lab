import { fromJS } from "immutable";
import * as constants from "../../../constants/actionTypes";


const defaultState = fromJS({
    handleHomework: []
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.QUERY_HOMEWORK_OK:
            return state.set("handleHomework", action.payload);
        default:
            return state;
    }
}
