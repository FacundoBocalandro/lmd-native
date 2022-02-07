import {connect} from "react-redux";
import actions from "../../actions";
import HeightGraph from "../components/HeightGraph";

const mapStateToProps = state => ({
    averageHeightData: state.graph.averageHeightData,
    userHeightHistory: state.graph.userHeightHistory
})

const mapDispatchToProps = dispatch => ({
    getAverageHeightData: () => dispatch(actions.graph.getAverageHeightData.request()),
    getUserHeightHistory: () => dispatch(actions.graph.getUserHeightHistory.request()),
})


export default connect(mapStateToProps, mapDispatchToProps)(HeightGraph);
