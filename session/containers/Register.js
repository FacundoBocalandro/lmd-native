import RegisterScreen from "../components/RegisterScreen";
import {connect} from "react-redux";
import actions from "../../actions";

const mapStateToProps = state => ({
    checkUsernameUsedPending: state.session.ui.checkUsernameUserPending,
    checkUsernameUsedError: state.session.ui.checkUsernameUsedError,
})

const mapDispatchToProps = dispatch => ({
    registerUser: (user, callback, errorCallback) => dispatch(actions.sessionActions.registerUser.request(user, callback, errorCallback)),
    checkUsernameUsed: (username, callback, errorCallback) => dispatch(actions.sessionActions.checkUsernameUsed.request(username, callback, errorCallback))
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
