import {connect} from "react-redux";
import actions from '../../actions'
import VaccineScreen from "../components/VaccineScreen";

const mapStateToProps = state => ({
    allVaccines: state.vaccines.allVaccines,
    userVaccines: state.vaccines.userVaccines
})

const mapDispatchToProps = dispatch => ({
    getUserVaccines: () => dispatch(actions.vaccines.getUserVaccines.request()),
    getAllVaccines: () => dispatch(actions.vaccines.getAllVaccines.request()),
    addAppliedVaccine: (vaccineData, callback, errorCallback) => dispatch(actions.vaccines.addAppliedVaccine.request(vaccineData, callback, errorCallback))
})

export default connect(mapStateToProps, mapDispatchToProps)(VaccineScreen);
