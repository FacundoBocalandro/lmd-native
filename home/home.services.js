import {get} from "../utils/http";

export const services = {
    getUserData: () => get('users/current')
}
