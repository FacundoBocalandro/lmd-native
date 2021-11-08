import {get} from "../utils/http";

export const services = {
    getPrenatalData: () => get('users/preborn')
}
