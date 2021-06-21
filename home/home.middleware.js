import actions from "../actions";
import {GET_USER_DATA_REQUEST} from "./home.action";
import {services} from "./home.services";

const homeMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        case GET_USER_DATA_REQUEST:
            services.getUserData()
                .then(res => dispatch(actions.home.getUserData.response(res)))
                .catch(err => dispatch(actions.home.getUserData.error(err)));
            break;
        default:
            break;
    }
}

export default homeMiddleware;
