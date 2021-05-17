import {CHECK_USERNAME_USED_ERROR, CHECK_USERNAME_USED_REQUEST, CHECK_USERNAME_USED_RESPONSE} from "./session.actions";

const initialState = {
    ui: {
        checkUsernameUserPending: false,
        checkUsernameUserError: false,
    }
}

const sessionReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHECK_USERNAME_USED_REQUEST:
            return {...state, ui: {...state.ui, checkUsernameUserPending: true}}
        case CHECK_USERNAME_USED_RESPONSE:
            return {...state, ui: {...state.ui, checkUsernameUserPending: false, checkUsernameUserError: false}}
        case CHECK_USERNAME_USED_ERROR:
            return {...state, ui: {...state.ui, checkUsernameUserPending: false, checkUsernameUserError: true}}
        default:
            return state
    }
}

export default sessionReducer;
