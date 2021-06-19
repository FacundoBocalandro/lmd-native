import {get, post} from "../utils/http"

export const services = {
    getAllVaccines: () => get('vaccine'),
    getUserVaccines: () => get('vaccine/get-user-vaccines'),
    addAppliedVaccine: (vaccineData) => post('vaccine/applied', vaccineData)
}
