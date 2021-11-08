import {connect} from "react-redux";
import BmiGraph from "../components/BmiGraph";
import actions from "../../actions";

const mapStateToProps = state => ({
    averageBmiData: state.graph.averageBmiData,
    userBmiHistory: state.graph.userBmiHistory,
})

const mapDispatchToProps = dispatch => ({
    getAverageBmiData: () => dispatch(actions.graph.getAverageBmiData.request()),
    getUserBmiHistory: () => dispatch(actions.graph.getUserBmiHistory.request()),
})


export default connect(mapStateToProps, mapDispatchToProps)(BmiGraph);
