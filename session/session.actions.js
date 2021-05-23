export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const REGISTER_USER_RESPONSE = "REGISTER_USER_RESPONSE";
export const REGISTER_USER_ERROR = "REGISTER_USER_ERROR";
export const CHECK_USERNAME_USED_REQUEST = "CHECK_USERNAME_USED_REQUEST";
export const CHECK_USERNAME_USED_RESPONSE = "CHECK_USERNAME_USED_RESPONSE";
export const CHECK_USERNAME_USED_ERROR = "CHECK_USERNAME_USED_ERROR";
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST";
export const LOGIN_USER_RESPONSE = "LOGIN_USER_RESPONSE";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";




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
    loginUser: {
        request: (user, callback, errorCallback) => ({type: LOGIN_USER_REQUEST, user, callback, errorCallback}),
        response: (res) => ({type: LOGIN_USER_RESPONSE, res}),
        error: (err) => ({type: LOGIN_USER_ERROR, err}),
    }
}

export default sessionActions;
