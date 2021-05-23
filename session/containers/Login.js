import actions from "../../actions";
import {connect} from "react-redux";
import LoginScreen from "../components/LoginScreen";

const mapStateToProps = state => ({
    loginPending: state.session.ui.loginPending
})

const mapDispatchToProps = dispatch => ({
    loginUser: (user, callback, errorCallback) => dispatch(actions.session.loginUser.request(user, callback, errorCallback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
