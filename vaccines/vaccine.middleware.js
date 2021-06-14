import {
    GET_USERS_VACCINE_REQUEST,
    GET_ALL_VACCINE_REQUEST

} from "./vaccine.actions";
import actions from "../actions";
import {services} from "./vaccine.services";

const vaccineMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        case GET_USERS_VACCINE_REQUEST:
            services.getUsersVaccines()
                .then(res => dispatch(actions.vaccine.getUsersVaccines.response(res.vaccineApplications)))
                .catch(err => dispatch(actions.vaccine.getUsersVaccines.error(err)));
            break;
        case GET_ALL_VACCINE_REQUEST:
            console.log("getting all vaccines")
            services.getAllVaccines()
                .then(res => dispatch(actions.vaccine.getAllVaccines.response(res)))
                .catch(err => dispatch(actions.vaccine.getAllVaccines.error(err)));
            break;
        default:
            break;
    }
}

export default vaccineMiddleware;
