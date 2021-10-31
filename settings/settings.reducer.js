import {GET_NOTIFICATIONS_RESPONSE} from "./settings.actions";

const initialState = {
    notificationSetting: undefined
}

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTIFICATIONS_RESPONSE:
            return {...state, notificationSetting: action.res}
        default:
            return state;
    }
}

export default settingsReducer;
