import actions from "../actions";
import {GET_USER_DATA_REQUEST} from "./home.action";
import {services} from "./home.services";
import {GET_USER_INFO_FROM_TOKEN_REQUEST} from "../session/session.actions";

const homeMiddleware = ({dispatch, getState}) => next => action => {
    next(action);

    switch (action.type) {
        case GET_USER_DATA_REQUEST:
            services.getUserData()
                .then(res => dispatch(actions.home.getUserData.response(res)))
                .catch(err => dispatch(actions.home.getUserData.error(err)));
            break;
        case GET_USER_INFO_FROM_TOKEN_REQUEST:
            services.getUserData(action.token)
                .then(res => dispatch(actions.session.getUserInfoFromToken.response(action.token, res)))
                .catch(err => dispatch(actions.session.getUserInfoFromToken.error(err)));
            break;
        default:
            break;
    }
}

export default homeMiddleware;
