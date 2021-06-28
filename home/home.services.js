import {get} from "../utils/http";

export const services = {
    getUserData: (token) => get('users/current', {token})
}
