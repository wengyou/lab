import * as constants from "../../constants/actionTypes";

export const fetchSoftwareResource = args => ({
    type: constants.FETCH_SOFTWARE_RESOURCE,
    args
});