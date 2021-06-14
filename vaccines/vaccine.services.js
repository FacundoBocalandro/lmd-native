import {get} from "../utils/http"

export const services = {
    getUsersVaccines: () => get('vaccine/get-user-vaccines'),
    getAllVaccines: () => get('vaccine'),
}
