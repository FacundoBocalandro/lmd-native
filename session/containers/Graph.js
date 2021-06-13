import {connect} from "react-redux";
import actions from '../../actions'
import GraphScreen from "../components/graphs/GraphScreen";

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    getPersonalData: () => dispatch(actions.getPersonalData.request()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GraphScreen);
