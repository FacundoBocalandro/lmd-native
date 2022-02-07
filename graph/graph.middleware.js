import {
    ADD_HEAD_DATA_REQUEST, ADD_HEIGHT_DATA_REQUEST,
    ADD_WEIGHT_DATA_REQUEST, GET_AVERAGE_BMI_DATA_REQUEST,
    GET_AVERAGE_HEIGHT_DATA_REQUEST,
    GET_AVERAGE_PERIMETER_DATA_REQUEST,
    GET_AVERAGE_WEIGHT_DATA_REQUEST, GET_USER_BMI_HISTORY_REQUEST,
    GET_USER_HEIGHT_HISTORY_REQUEST,
    GET_USER_PERIMETER_HISTORY_REQUEST,
    GET_USER_WEIGHT_HISTORY_REQUEST
} from "./graph.action";
import actions from "../actions";
import {services} from "./graph.services";
import {adapt3PercentileData, adapt7PercentileData, adaptUserHistoryData} from "../utils/averageData";
import {GENDERS} from "../constants/PersonalData";

const graphMiddleware = ({dispatch, getState}) => next => action => {
    next(action);
    switch (action.type) {
        case GET_AVERAGE_WEIGHT_DATA_REQUEST:
            services.getAverageWeightData(getState().home.user.gender === GENDERS.MALE)
                .then(res => {
                    dispatch(actions.graph.getAverageWeightData.response(adapt7PercentileData(res.weights)))
                })
                .catch(err => dispatch(actions.graph.getAverageWeightData.error(err)))
            break;
        case GET_AVERAGE_PERIMETER_DATA_REQUEST:
            services.getAveragePerimeterData(getState().home.user.gender === GENDERS.MALE)
                .then(res => dispatch(actions.graph.getAveragePerimeterData.response(adapt3PercentileData(res.perimeters))))
                .catch(err => dispatch(actions.graph.getAveragePerimeterData.error(err)))
            break;
        case GET_AVERAGE_HEIGHT_DATA_REQUEST:
            services.getAverageHeightData(getState().home.user.gender === GENDERS.MALE)
                .then(res => dispatch(actions.graph.getAverageHeightData.response(adapt7PercentileData(res.heights))))
                .catch(err => dispatch(actions.graph.getAverageHeightData.error(err)))
            break;
        case GET_AVERAGE_BMI_DATA_REQUEST:
            services.getAverageBmiData(getState().home.user.gender  === GENDERS.MALE)
                .then(res => dispatch(actions.graph.getAverageBmiData.response(adapt7PercentileData(res.bmiList))))
                .catch(err => dispatch(actions.graph.getAverageBmiData.error(err)))
            break;
        case GET_USER_WEIGHT_HISTORY_REQUEST:
            services.getUserWeightHistory()
                .then(res => dispatch(actions.graph.getUserWeightHistory.response(adaptUserHistoryData(res, 'weight', getState().home.user.birthDate))))
                .catch(err => dispatch(actions.graph.getUserWeightHistory.error(err)));
            break;
        case GET_USER_PERIMETER_HISTORY_REQUEST:
            services.getUserPerimeterHistory()
                .then(res => dispatch(actions.graph.getUserPerimeterHistory.response(adaptUserHistoryData(res, 'perimeter', getState().home.user.birthDate))))
                .catch(err => dispatch(actions.graph.getUserPerimeterHistory.error(err)));
            break;
        case GET_USER_HEIGHT_HISTORY_REQUEST:
            services.getUserHeightHistory()
                .then(res => dispatch(actions.graph.getUserHeightHistory.response(adaptUserHistoryData(res, 'height',getState().home.user.birthDate))))
                .catch(err => dispatch(actions.graph.getUserHeightHistory.error(err)));
            break;
        case GET_USER_BMI_HISTORY_REQUEST:
            services.getUserBmiHistory()
                .then(res => dispatch(actions.graph.getUserBmiHistory.response(adaptUserHistoryData(res, 'bmi',getState().home.user.birthDate))))
                .catch(err => dispatch(actions.graph.getUserBmiHistory.error(err)));
            break;
        case ADD_WEIGHT_DATA_REQUEST:
            services.addWeightData(action.data)
                .then(res => dispatch(actions.graph.addWeightData.response(res)))
                .catch(err => dispatch(actions.graph.addWeightData.error(err)));
            break;
        case ADD_HEIGHT_DATA_REQUEST:
            services.addHeightData(action.data)
                .then(res => dispatch(actions.graph.addHeightData.response(res)))
                .catch(err => dispatch(actions.graph.addHeightData.error(err)));
            break;
        case ADD_HEAD_DATA_REQUEST:
            services.addHeadData(action.data)
                .then(res => dispatch(actions.graph.addHeadData.response(res)))
                .catch(err => dispatch(actions.graph.addHeadData.error(err)));
            break;
        default:
            break;
    }
}

export default graphMiddleware;
