import {connect} from "react-redux";
import VaccineInformationScreen from "../components/VaccineInformationScreen";
import actions from "../../actions";

const mapStateToProps = state => ({
    vaccineId: state.vaccineInfo.vaccineId,
    vaccineDetails: state.vaccineInfo.vaccineDetails
})

const mapDispatchToProps = dispatch => ({
    getVaccineDetails: (id) => dispatch(actions.vaccineInfo.getVaccineDetails.request(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(VaccineInformationScreen);
