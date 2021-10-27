export const SAVE_GLOBAL_NOTIFICATION_REQUEST = "SAVE_GLOBAL_NOTIFICATION_REQUEST";
export const SAVE_GLOBAL_NOTIFICATION_RESPONSE = "SAVE_GLOBAL_NOTIFICATION_RESPONSE";
export const SAVE_GLOBAL_NOTIFICATION_ERROR = "SAVE_GLOBAL_NOTIFICATION_ERROR";
export const SAVE_VACCINE_NOTIFICATION_REQUEST = "SAVE_VACCINE_NOTIFICATION_REQUEST";
export const SAVE_VACCINE_NOTIFICATION_RESPONSE = "SAVE_VACCINE_NOTIFICATION_RESPONSE";
export const SAVE_VACCINE_NOTIFICATION_ERROR = "SAVE_VACCINE_NOTIFICATION_ERROR";

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
}

export default settingsActions;

