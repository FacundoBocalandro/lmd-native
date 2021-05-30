export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_RESPONSE = "REGISTER_USER_RESPONSE";
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR";
export const CHECK_USERNAME_USED_REQUEST = "CHECK_USERNAME_USED_REQUEST";
export const CHECK_USERNAME_USED_RESPONSE = "CHECK_USERNAME_USED_RESPONSE";
export const CHECK_USERNAME_USED_ERROR = "CHECK_USERNAME_USED_ERROR";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_RESPONSE = "LOGIN_RESPONSE";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = 'LOGOUT'




const sessionActions = {
    registerUser: {
        request: (user, callback, errorCallback) => ({type: REGISTER_USER_REQUEST, user, callback, errorCallback}),
        response: (res) => ({type: REGISTER_USER_RESPONSE, res}),
        error: (err) => ({type: REGISTER_USER_ERROR, err}),
    },
    checkUsernameUsed: {
        request: (username, callback, errorCallback) => ({type: CHECK_USERNAME_USED_REQUEST, username, callback, errorCallback}),
        response: (res) => ({type: CHECK_USERNAME_USED_RESPONSE, res}),
        error: (err) => ({type: CHECK_USERNAME_USED_ERROR, err}),
    },
    login: {
        request: (form, callback, errorCallback) => ({type: LOGIN_REQUEST, form, callback, errorCallback}),
        response: (res) => ({type: LOGIN_RESPONSE, res}),
        error: (err) => ({type: LOGIN_ERROR, err}),
    },
    logout: () => ({type: LOGOUT})
}

export default sessionActions;
