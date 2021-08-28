import {connect} from "react-redux";
import ReadingsScreen from "../components/ReadingsScreen";
import actions from "../../actions";

const mapStateToProps = state => ({
    allCategories: state.readings.allCategories,
    categoryReadings: state.readings.categoryReadings,
})

const mapDispatchToProps = dispatch => ({
    getAllCategories: () =>  dispatch(actions.readings.getAllCategories.request()),
    getAllReadingsForCategory: (category) => dispatch(actions.readings.getAllReadingsForCategory.request(category))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReadingsScreen);
