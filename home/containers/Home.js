import HomeScreen from "../components/HomeScreen";
import {connect} from "react-redux";
import actions from '../../actions'

const mapStateToProps = state => ({
    user: state.home.user,
    hitos: state.hitos.hitos
})

const mapDispatchToProps = dispatch => ({
    getUserData: () => dispatch(actions.home.getUserData.request()),
    getHitos: () => dispatch(actions.hitos.getHitos.request())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
