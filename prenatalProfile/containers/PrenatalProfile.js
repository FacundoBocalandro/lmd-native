import PrenatalProfileScreen from "../components/PrenatalProfileScreen";
import {connect} from "react-redux";
import actions from "../../actions";

const mapStateToProps = state => ({
    data: state.prenatalProfile.data
})

const mapDispatchToProps = dispatch => ({
    getPrenatalData: () => dispatch(actions.prenatalProfile.getPrenatalData.request()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PrenatalProfileScreen);
