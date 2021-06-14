import {
    GET_AVERAGE_HEIGHT_DATA_REQUEST,
    GET_AVERAGE_PERIMETER_DATA_REQUEST,
    GET_AVERAGE_WEIGHT_DATA_REQUEST,
    GET_USER_HEIGHT_HISTORY_REQUEST,
    GET_USER_PERIMETER_HISTORY_REQUEST,
    GET_USER_WEIGHT_HISTORY_REQUEST
} from "./graph.action";
import actions from "../actions";
import {services} from "./graph.services";
import {adapt3PercentileData, adapt7PercentileData} from "../utils/averageData";
import {SEX} from "../constants/PersonalData"

const graphMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
        case GET_AVERAGE_WEIGHT_DATA_REQUEST:
            services.getAverageWeightData(getState().home.personalData.sex === SEX.MALE)
                .then(res => {
                    console.log("respo" + res)
                    dispatch(actions.graph.getAverageWeightData.response(adapt7PercentileData(res.weights)))})
                .catch(err => dispatch(actions.graph.getAverageWeightData.error(err)))
            break;
        case GET_AVERAGE_PERIMETER_DATA_REQUEST:
            services.getAveragePerimeterData(getState().home.personalData.sex === SEX.MALE)
                .then(res => dispatch(actions.graph.getAveragePerimeterData.response(adapt3PercentileData(res.perimeters))))
                .catch(err => dispatch(actions.graph.getAveragePerimeterData.error(err)))
            break;
        case GET_AVERAGE_HEIGHT_DATA_REQUEST:
            services.getAverageHeightData(getState().home.personalData.sex === SEX.MALE)
                .then(res => dispatch(actions.graph.getAverageHeightData.response(adapt7PercentileData(res.heights))))
                .catch(err => dispatch(actions.graph.getAverageHeightData.error(err)))
            break;
        case GET_USER_WEIGHT_HISTORY_REQUEST:
            services.getUserWeightHistory()
                .then(res => dispatch(actions.graph.getUserWeightHistory.response(res)))
                .catch(err => dispatch(actions.graph.getUserWeightHistory.error(err)));
            break;
        case GET_USER_PERIMETER_HISTORY_REQUEST:
            services.getUserPerimeterHistory()
                .then(res => dispatch(actions.graph.getUserPerimeterHistory.response(res)))
                .catch(err => dispatch(actions.graph.getUserPerimeterHistory.error(err)));
            break;
        case GET_USER_HEIGHT_HISTORY_REQUEST:
            services.getUserHeightHistory()
                .then(res => dispatch(actions.graph.getUserHeightHistory.response(res)))
                .catch(err => dispatch(actions.graph.getUserHeightHistory.error(err)));
            break;
        default:
            break;
    }
}

export default graphMiddleware;
