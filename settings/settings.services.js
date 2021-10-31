import {get, put} from "../utils/http";

export const services = {
    saveGlobalNotifications: (enable) => put('users/globalnotifications', "",{options: {params: {enable: enable}}}),
    saveVaccineNotifications: (enable) => put(`users/vaccinenotifications`, "",{options: {params: {enable: enable}}}),
    getNotificationSettings: () => get('users/notifications')
}
