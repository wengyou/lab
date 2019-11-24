import {fromJS} from "immutable";
import * as constants from "../../constants/actionTypes"

const defaultState = fromJS({
    studyResource: [],
    softwareResource:[],
    total: "",
    learningUrl: ""
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.FETCH_STUDY_RES_SUCCESS:
            //merge：浅合并，新数据与旧数据对比，旧数据中不存在的属性直接添加，旧数据中已存在的属性用新数据中的覆盖
            return state.merge({
                total: action.payload.total,
                studyResource: action.payload.items
            });
        case constants.FETCH_SOFTWARE_RES_SUCCESS:
            return state.merge({
                total: action.payload.total,
                softwareResource: action.payload.items
            });
        case constants.FETCH_LOAD_RESOURCE_SUCCESS:
            return state.merge({
                learningUrl: action.loadUrl
            });
        default:
            return state;
    }
}