import {get, post} from "../../utils/http"
export const services = {
    getVaccineDetails: (id) => get(`vaccine/details/${id}`)
}
