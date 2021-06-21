import HomeScreen from "../components/HomeScreen";
import {connect} from "react-redux";
import actions from '../../actions'

const mapStateToProps = state => ({
    user: state.session.user
})

const mapDispatchToProps = dispatch => ({
    getUserData: () => dispatch(actions.session.getUserData.request())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
