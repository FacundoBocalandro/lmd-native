import {connect} from "react-redux";
import actions from "../../actions";
import HitosScreen from "../components/HitosScreen";

const mapStateToProps = state => ({
    hitos: state.hitos.hito,
})

const mapDispatchToProps = dispatch => ({
    getHitos: () =>  dispatch(actions.hitos.getHitos.request()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HitosScreen);
