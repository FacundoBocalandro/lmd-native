import {
    GET_PRENATAL_DATA_REQUEST
} from "./prenatalProfile.actions";
import {services} from "./prenatalProfile.services";
import actions from "../actions";


const prenatalProfileMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        case GET_PRENATAL_DATA_REQUEST:
            services.getPrenatalData()
                .then(res => dispatch(actions.prenatalProfile.getPrenatalData.response(res)))
                .catch(err => dispatch(actions.prenatalProfile.getPrenatalData.error(err)));
            break;
        default:
            break;
    }
}

export default prenatalProfileMiddleware;
