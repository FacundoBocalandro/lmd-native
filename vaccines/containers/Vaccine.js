import {connect} from "react-redux";
import actions from '../../actions'
import VaccineScreen from "../components/VaccineScreen";

const mapStateToProps = state => ({
    allVaccines: state.vaccine.allVaccines,
    usersVaccines: state.vaccine.usersVaccines
})

const mapDispatchToProps = dispatch => ({
    getUsersVaccines: () => dispatch(actions.vaccine.getUsersVaccines.request()),
    getAllVaccines: () => dispatch(actions.vaccine.getAllVaccines.request()),
})

export default connect(mapStateToProps, mapDispatchToProps)(VaccineScreen);
