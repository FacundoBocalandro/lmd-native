import HomeScreen from "../components/HomeScreen";
import {connect} from "react-redux";
import actions from '../../actions'

const mapStateToProps = state => ({
    user: state.home.user
})

const mapDispatchToProps = dispatch => ({
    getUserData: () => dispatch(actions.home.getUserData.request())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
