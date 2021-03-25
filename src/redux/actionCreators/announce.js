import * as constants from '../../constants/actionTypes';

export const queryAnnounce = page =>(
    {
        type: constants.QUERY_ANNOUNCE,
        page
    }
);
