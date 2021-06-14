export const GET_USERS_VACCINE_REQUEST = "GET_USERS_VACCINE_REQUEST"
export const GET_USERS_VACCINE_RESPONSE = "GET_USERS_VACCINE_RESPONSE"
export const GET_USERS_VACCINE_ERROR = "GET_USERS_VACCINE_ERROR"
export const GET_ALL_VACCINE_REQUEST = "GET_ALL_VACCINE_REQUEST"
export const GET_ALL_VACCINE_RESPONSE = "GET_ALL_VACCINE_RESPONSE"
export const GET_ALL_VACCINE_ERROR = "GET_ALL_VACCINE_ERROR"
const vaccineActions = {
    getUsersVaccines: {
        request : () => ({type: GET_USERS_VACCINE_REQUEST}),
        response: (vaccineApplications) => ({type: GET_USERS_VACCINE_RESPONSE, vaccineApplications}),
        error: (err) => ({type: GET_USERS_VACCINE_ERROR, err})
    },
    getAllVaccines: {
        request : () => ({type: GET_ALL_VACCINE_REQUEST}),
        response: (res) => ({type: GET_ALL_VACCINE_RESPONSE, res}),
        error: (err) => ({type: GET_ALL_VACCINE_ERROR, err})
    }
}

export default vaccineActions
