export const REGISTER_USER_REQUEST = "REGISTER_USER_REQUEST";
export const CHECK_USERNAME_USED_REQUEST = "CHECK_USERNAME_USED_REQUEST";
export const CHECK_USERNAME_USED_RESPONSE = "CHECK_USERNAME_USED_RESPONSE";
export const CHECK_USERNAME_USED_ERROR = "CHECK_USERNAME_USED_ERROR";


const sessionActions = {
    registerUser: {
        request: (user, callback, errorCallback) => ({type: REGISTER_USER_REQUEST, user, callback, errorCallback}),
    },
    checkUsernameUsed: {
        request: (username, callback, errorCallback) => ({type: CHECK_USERNAME_USED_REQUEST, username, callback, errorCallback}),
        response: (res) => ({type: CHECK_USERNAME_USED_RESPONSE, res}),
        error: (err) => ({type: CHECK_USERNAME_USED_ERROR, err}),
    }
}

export default sessionActions;
