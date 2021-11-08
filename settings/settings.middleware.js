import {
    GET_NOTIFICATIONS_REQUEST,
    SAVE_GLOBAL_NOTIFICATION_REQUEST, SAVE_VACCINE_NOTIFICATION_REQUEST,
} from "./settings.actions";
import {services} from "./settings.services";
import actions from "../actions";

const settingsMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        case SAVE_GLOBAL_NOTIFICATION_REQUEST:
            services.saveGlobalNotifications(action.enable)
                .then(res => {
                    if (action.callback) action.callback(res);
                    dispatch(actions.settings.saveGlobalNotifications.response(res));
                })
                .catch(err => {
                    if (action.errorCallback) action.errorCallback(err);
                    dispatch(actions.settings.saveGlobalNotifications.error(err));
                })
            break;
        case SAVE_VACCINE_NOTIFICATION_REQUEST:
            services.saveVaccineNotifications(action.enable)
                .then(res => {
                    if (action.callback) action.callback(res);
                    dispatch(actions.settings.saveVaccineNotifications.response(res));
                })
                .catch(err => {
                    if (action.errorCallback) action.errorCallback(err);
                    dispatch(actions.settings.saveVaccineNotifications.error(err));
                })
            break;
        case GET_NOTIFICATIONS_REQUEST:
            services.getNotificationSettings()
                .then(res => dispatch(actions.settings.getNotificationSettings.response(res)))
                .catch(err => dispatch(actions.settings.getNotificationSettings.error(err)));
            break;
        default:
            break;
    }
}

export default settingsMiddleware;
