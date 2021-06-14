import {connect} from "react-redux";
import actions from "../../actions";
import PerimeterGraph from "../components/PerimeterGraph";

const mapStateToProps = state => ({
    averagePerimeterData: state.graph.averagePerimeterData,
    userPerimeterHistory: state.graph.userPerimeterHistory
})

const mapDispatchToProps = dispatch => ({
    getAveragePerimeterData: () => dispatch(actions.graph.getAveragePerimeterData.request()),
    getUserPerimeterHistory: () => dispatch(actions.graph.getUserPerimeterHistory.request()),
})


export default connect(mapStateToProps, mapDispatchToProps)(PerimeterGraph);
