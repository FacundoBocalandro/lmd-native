import actions from "../actions";
import {services} from "./reading.services";
import {GET_ALL_CATEGORIES_REQUEST, GET_CATEGORY_READINGS_REQUEST} from "./reading.actions";

const readingsMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
        case GET_ALL_CATEGORIES_REQUEST:
            services.getAllCategories()
                .then(res => dispatch(actions.readings.getAllCategories.response(res)))
                .catch(err => dispatch(actions.readings.getAllCategories.error(err)));
            break;
        case GET_CATEGORY_READINGS_REQUEST:
            services.getAllReadingsForCategory(action.category)
                .then(res => dispatch(actions.readings.getAllReadingsForCategory.response(res)))
                .catch(err => dispatch(actions.readings.getAllReadingsForCategory.error(err)));
            break;
        default:
            break;
    }
}
export default readingsMiddleware;
