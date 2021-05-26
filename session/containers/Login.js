import actions from "../../actions";
import {connect} from "react-redux";
import LoginScreen from "../components/LoginScreen";

const mapStateToProps = state => ({
    loginPending: state.session.ui.loginPending
})

const mapDispatchToProps = dispatch => ({
    login: (form, callback, errorCallback) => dispatch(actions.session.login.request(form, callback, errorCallback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
