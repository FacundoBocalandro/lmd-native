import {
    GET_USER_VACCINES_REQUEST,
    GET_ALL_VACCINES_REQUEST, ADD_APPLIED_VACCINE_REQUEST
} from "./vaccines.actions";
import actions from "../actions";
import {services} from "./vaccines.services";
import {LOGIN_REQUEST} from "../session/session.actions";

const vaccinesMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        case GET_ALL_VACCINES_REQUEST:
            services.getAllVaccines()
                .then(res => dispatch(actions.vaccines.getAllVaccines.response(res)))
                .catch(err => dispatch(actions.vaccines.getAllVaccines.error(err)));
            break;
        case GET_USER_VACCINES_REQUEST:
            services.getUserVaccines()
                .then(res => dispatch(actions.vaccines.getUserVaccines.response(res.vaccineApplications)))
                .catch(err => dispatch(actions.vaccines.getUserVaccines.error(err)));
            break;
        case ADD_APPLIED_VACCINE_REQUEST:
            services.addAppliedVaccine(action.vaccineData)
                .then(res => {
                    if (action.callback) action.callback(res)
                    dispatch(actions.vaccines.addAppliedVaccine.response(res));
                })
                .catch(err => {
                    if (action.errorCallback) action.errorCallback(err);
                    dispatch(actions.vaccines.addAppliedVaccine.error(err));
                })
            break;
        default:
            break;
    }
}

export default vaccinesMiddleware;
