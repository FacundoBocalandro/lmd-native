import {
    CHECK_USERNAME_USED_ERROR,
    CHECK_USERNAME_USED_REQUEST,
    CHECK_USERNAME_USED_RESPONSE, REGISTER_USER_ERROR,
    REGISTER_USER_REQUEST, REGISTER_USER_RESPONSE
} from "./session.actions";

const initialState = {
    ui: {
        checkUsernameUsedPending: false,
        checkUsernameUsedError: false,
        registerPending: false,
    }
}

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {...state, ui: {...state.ui, registerPending: true}}
        case REGISTER_USER_RESPONSE:
            return {...state, ui: {...state.ui, registerPending: false}}
        case REGISTER_USER_ERROR:
            return {...state, ui: {...state.ui, registerPending: false}}
        case CHECK_USERNAME_USED_REQUEST:
            return {...state, ui: {...state.ui, checkUsernameUsedPending: true}}
        case CHECK_USERNAME_USED_RESPONSE:
            return {...state, ui: {...state.ui, checkUsernameUsedPending: false, checkUsernameUsedError: false}}
        case CHECK_USERNAME_USED_ERROR:
            return {...state, ui: {...state.ui, checkUsernameUsedPending: false, checkUsernameUsedError: true}}
        default:
            return state
    }
}

export default sessionReducer;
