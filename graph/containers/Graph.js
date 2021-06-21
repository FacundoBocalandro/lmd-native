import {connect} from "react-redux";
import actions from '../../actions'
import GraphScreen from "../components/GraphScreen";

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    addWeightData: (data) => dispatch(actions.graph.addWeightData.request(data)),
    addHeadData: (data) => dispatch(actions.graph.addHeadData.request(data)),
    addHeightData: (data) => dispatch(actions.graph.addHeightData.request(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(GraphScreen);
