import {fromJS} from "immutable";
import * as constants from '../../constants/actionTypes';
const defaultState = fromJS(
    {
        announceResource: [],
        total: ""
    }
);
export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.QUERY_ANNOUNCE_SUCCESS:
            return state.merge({
                announceResource: action.payload.items,
                total: action.payload.total,
            }
            );
        default:
            return state;
    }
};