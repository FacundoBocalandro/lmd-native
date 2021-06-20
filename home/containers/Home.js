import HomeScreen from "../components/HomeScreen";
import {connect} from "react-redux";
import actions from '../../actions'

const mapStateToProps = state => ({
    personalData: state.home.personalData
    user: state.session.user
})

const mapDispatchToProps = dispatch => ({
    getPersonalData: () => dispatch(actions.home.getPersonalData.request()),
    getUserData: () => dispatch(actions.session.getUserData.request())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
