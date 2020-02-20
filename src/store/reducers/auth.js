import {AUTH_FAILURE, AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionTypes";

const initialState = {
    token: null,
    isError: false
};

const authReducer = (state=initialState, {type, payload}) => {
    switch (type) {
        case AUTH_SUCCESS:
            return {...state, token: payload, isError: false};
        case AUTH_LOGOUT:
            return {...state, token: null};
        case AUTH_FAILURE:
            return {...state, isError: true};
        default:
            return state
    }
};

export default authReducer;