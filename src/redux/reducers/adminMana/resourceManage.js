import { fromJS } from "immutable";
import * as constants from "../../../constants/actionTypes"
const defaultState = fromJS({
    resourceData: '',
    resourceTotal: '',
    softwareData: '',
    softwareTotal: '',
    resourcePage: '',
    softwarePage: '',
    temp: '',
    resourceSearchFlag: false,
    softwareSearchFlag: false,
});

export default (state = defaultState, action) => {
    switch (action.type) {
        //获取学习资料
        case constants.FETCH_ADMIN_RESOURCE_DATA_SUCCESS:
            return state.merge({
                resourceData: action.payload.items,
                resourceTotal: action.payload.total,
                resourcePage: action.payload.page
            });
            //获取软件
        case constants.FETCH_ADMIN_SOFTWARE_DATA_SUCCESS:
            return state.merge({
                softwareData: action.payload.items,
                softwareTotal: action.payload.total,
                softwarePage: action.payload.page
            });
            //搜索学习资料
        case constants.SEARCH_RESOURCE_DATA_SUCCESS:
            return state.merge({
                resourceData: action.payload.items,
                resourceTotal: action.payload.total,
                resourcePage: action.payload.page,
                resourceSearchFlag: true,
            });
            //上传学习资料
        case constants.IMPORT_RESOURCE_SUCCESS:
            return state.set("temp", new Date());
            //搜索软件资料
        case constants.SEARCH_SOFTWARE_DATA_SUCCESS:
            return state.merge({
                softwareData: action.payload.items,
                softwareTotal: action.payload.total,
                softwarePage: action.payload.page,
                resourceSearchFlag: true
            });
            //删除学习资料
        case constants.DELETE_RESOURCE_DATA_SUCCESS:
            return state.set("temp", new Date());
            //删除软件
        case constants.DELETE_SOFTWARE_DATA_SUCCESS:
            return state.set("temp", new Date());
            //导入软件
        case constants.IMPORT_SOFTWARE_SUCCESS:
            return state.set("temp", new Date());
        default:
            return state;

    }
}
