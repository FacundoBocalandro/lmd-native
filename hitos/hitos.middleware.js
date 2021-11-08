import actions from "../actions";
import {services} from "./hitos.services";
import {GET_HITOS_REQUEST} from "./hitos.actions";

const hitosMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
        case GET_HITOS_REQUEST:
            services.getHitos()
                .then(res => dispatch(actions.hitos.getHitos.response(res)))
                .catch(err => dispatch(actions.hitos.getHitos.error(err)));
            break;
        default:
            break;
    }
}
export default hitosMiddleware;
