import actions from "../../actions";
import {connect} from "react-redux";
import WeightGraph from "../components/WeightGraph";

const mapStateToProps = state => ({
    averageWeightData: state.graph.averageWeightData,
    userWeightHistory: state.graph.userWeightHistory
})

const mapDispatchToProps = dispatch => ({
    getAverageWeightData: () => dispatch(actions.graph.getAverageWeightData.request()),
    getUserWeightHistory: () => dispatch(actions.graph.getUserWeightHistory.request()),
})


export default connect(mapStateToProps, mapDispatchToProps)(WeightGraph);
