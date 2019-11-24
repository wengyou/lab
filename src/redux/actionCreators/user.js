import * as constants from "../../constants/actionTypes";

export const login = args => ({
    type: constants.LOGIN,
    args
});

export const register = args => ({
    type: constants.REGISTER,
    args
});
