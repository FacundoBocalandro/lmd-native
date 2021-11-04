import {connect} from "react-redux";
import actions from "../../actions";
import RelationshipsScreen from "../components/RelationshipScreen";

const mapStateToProps = state => ({
    relationships: state.relationships.relationships,
    userInfo: state.home.user
})

const mapDispatchToProps = dispatch => ({
    getAllRelationships: () => dispatch(actions.relationships.getAllRelationships.request()),
    addNewRelationship: (info, callback, errorCallback) => dispatch(actions.relationships.addNewRelationship.request(info, callback, errorCallback)),
    deleteRelationship: (info) => dispatch(actions.relationships.deleteRelationship.request(info)),
    searchDoctors: (dni, callback, errorCallback) => dispatch(actions.relationships.searchDoctors.request(dni, callback, errorCallback))
})

export default connect(mapStateToProps, mapDispatchToProps)(RelationshipsScreen);
