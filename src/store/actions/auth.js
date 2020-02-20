import axios from "axios";
import {AUTH_FAILURE, AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";


export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {type: AUTH_LOGOUT}
};

export const autoLogout = time => dispatch => {
    setTimeout(() => {
        dispatch(logout())
    }, time);
};

export const autoLogin = () => dispatch => {
    const token = localStorage.getItem('token');
    if (token) {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate >= new Date()) {
            dispatch({type: AUTH_SUCCESS, payload: token});
            dispatch(autoLogout(expirationDate - new Date()));
        } else {
            dispatch(logout())
        }
    } else {
        dispatch(logout())
    }
};

export const auth = (email, password, isLogin) => async dispatch => {
    const authData = {
        email,
        password,
        returnSecureToken: true
    };

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8cPXHxl2UvGwmJUhQ-y15A46W0WMnTSA';

    if (isLogin)
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8cPXHxl2UvGwmJUhQ-y15A46W0WMnTSA';

    try {
        const response = await axios.post(url, authData);
        const {idToken, localId, expiresIn} = response.data;
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        localStorage.setItem('token', idToken);
        localStorage.setItem('userId', localId);
        localStorage.setItem('expirationDate', expirationDate.toString());

        dispatch({type: AUTH_SUCCESS, payload: idToken});
        dispatch(autoLogout(expiresIn * 1000));
    } catch (e) {
        dispatch({type: AUTH_FAILURE});
    }
};