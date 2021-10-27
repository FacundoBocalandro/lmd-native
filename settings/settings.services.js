import {get, put} from "../utils/http";

export const services = {
    saveGlobalNotifications: (enable) => put('users/globalnotifications', enable),
    saveVaccineNotifications: (enable) => put('users/vaccinenotifications', enable),
}
