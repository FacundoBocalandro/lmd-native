import {connect} from "react-redux";
import actions from '../../actions'
import VaccineScreen from "../components/VaccineScreen";

const mapStateToProps = state => ({
    allVaccines: state.vaccines.allVaccines,
    userVaccines: state.vaccines.userVaccines,
})

const mapDispatchToProps = dispatch => ({
    getUserVaccines: () => dispatch(actions.vaccines.getUserVaccines.request()),
    getAllVaccines: () => dispatch(actions.vaccines.getAllVaccines.request()),
    setVaccineId: (vaccineId) => dispatch(actions.vaccineInfo.setVaccineId.request(vaccineId))
})

export default connect(mapStateToProps, mapDispatchToProps)(VaccineScreen);
