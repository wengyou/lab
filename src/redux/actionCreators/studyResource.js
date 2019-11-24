import * as constants from "../../constants/actionTypes";

export const fetchStudyResource = args => ({
    type: constants.FETCH_STUDY_RESOURCE,
    args
});