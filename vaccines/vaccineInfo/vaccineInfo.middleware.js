import {
    GET_VACCINE_DETAILS_REQUEST
} from "./vaccineInfo.actions";
import actions from "../../actions";
import {services} from "./vaccineInfo.services";

const vaccineInfoMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        case GET_VACCINE_DETAILS_REQUEST:
            services.getVaccineDetails(action.id)
                .then(res => dispatch(actions.vaccineInfo.getVaccineDetails.response(res)))
                .catch(err => dispatch(actions.vaccineInfo.getVaccineDetails.error(err)));
            break;
        default:
            break;
    }
}

export default vaccineInfoMiddleware;
