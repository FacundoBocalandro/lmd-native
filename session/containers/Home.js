import HomeScreen from "../components/HomeScreen";
import {connect} from "react-redux";
import actions from '../../actions'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(actions.session.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
