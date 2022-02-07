export const SAVE_GLOBAL_NOTIFICATION_REQUEST = "SAVE_GLOBAL_NOTIFICATION_REQUEST";
export const SAVE_GLOBAL_NOTIFICATION_RESPONSE = "SAVE_GLOBAL_NOTIFICATION_RESPONSE";
export const SAVE_GLOBAL_NOTIFICATION_ERROR = "SAVE_GLOBAL_NOTIFICATION_ERROR";
export const SAVE_VACCINE_NOTIFICATION_REQUEST = "SAVE_VACCINE_NOTIFICATION_REQUEST";
export const SAVE_VACCINE_NOTIFICATION_RESPONSE = "SAVE_VACCINE_NOTIFICATION_RESPONSE";
export const SAVE_VACCINE_NOTIFICATION_ERROR = "SAVE_VACCINE_NOTIFICATION_ERROR";
export const GET_NOTIFICATIONS_REQUEST = "GET_NOTIFICATIONS_REQUEST";
export const GET_NOTIFICATIONS_RESPONSE = "GET_NOTIFICATIONS_RESPONSE";
export const GET_NOTIFICATIONS_ERROR = "GET_NOTIFICATIONS_ERROR";

const settingsActions = {
    saveGlobalNotifications: {
        request: (enable, callback, errorCallback) => ({type: SAVE_GLOBAL_NOTIFICATION_REQUEST, enable, callback, errorCallback}),
        response: (res) => ({type: SAVE_GLOBAL_NOTIFICATION_RESPONSE, res}),
        error: (err) => ({type: SAVE_GLOBAL_NOTIFICATION_ERROR, err}),
    },
    saveVaccineNotifications: {
        request: (enable, callback, errorCallback) => ({type: SAVE_VACCINE_NOTIFICATION_REQUEST, enable, callback, errorCallback}),
        response: (res) => ({type: SAVE_VACCINE_NOTIFICATION_RESPONSE, res}),
        error: (err) => ({type: SAVE_VACCINE_NOTIFICATION_ERROR, err}),
    },
    getNotificationSettings: {
        request: () => ({type: GET_NOTIFICATIONS_REQUEST}),
        response: (res) => ({type: GET_NOTIFICATIONS_RESPONSE, res}),
        error: (err) => ({type: GET_NOTIFICATIONS_ERROR, err}),
    },
}

export default settingsActions;

