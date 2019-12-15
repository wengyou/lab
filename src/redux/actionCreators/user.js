import * as constants from "../../constants/actionTypes";

export const login = args => ({
    type: constants.LOGIN,
    args
});

export const register = args => ({
    type: constants.REGISTER,
    args
});
export const teacher = () => ({
    type: constants.TEACHERRES
});
//保存
export const preserve = args => ({
    type: constants.PRESERVE,
    args
});
//查询带注册用户
export const queryRegister = args => ({
    type: constants.FETCH_QUERY_REGISTER,
    args
});
//批准注册用户
export const registered = args => ({
    type: constants.REGISTER,
    args
});
