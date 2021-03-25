import {fromJS} from "immutable";
import * as constants from '../../constants/actionTypes';
const defaultState = fromJS(
    {
        announceResource: [],
        total: "",
        releaseAnnounceFlag: true,
        deleteAnnounceFlag: true,
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
        case constants.ADMIN_RELEASE_ANNOUNCE_SUCCESS:
        case constants.ADMIN_EDIT_ANNOUNCE_SUCCESS:
            const releaseAnnounceFlag = state.toJS().releaseAnnounceFlag;
            return state.set(
                "releaseAnnounceFlag", !releaseAnnounceFlag
            );
        case constants.ADMIN_DELETE_ANNOUNCE_SUCCESS:
            const deleteAnnounceFlag = state.toJS().deleteAnnounceFlag;
            return state.set(
                "deleteAnnounceFlag", !deleteAnnounceFlag
            );
        default:
            return state;
    }
};
