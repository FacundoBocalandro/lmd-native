import {connect} from "react-redux";
import actions from '../../actions'
import NotificationCenterScreen from "../components/NotificationCenterScreen";

const mapStateToProps = state => ({
    notificationSetting: state.settings.notificationSetting
})

const mapDispatchToProps = dispatch => ({
    saveGlobalNotifications: (enable, callback, errorCallback) => dispatch(actions.settings.saveGlobalNotifications.request(enable, callback, errorCallback)),
    saveVaccineNotifications: (enable, callback, errorCallback) => dispatch(actions.settings.saveVaccineNotifications.request(enable, callback, errorCallback)),
    getNotificationSettings: () => dispatch(actions.settings.getNotificationSettings.request())
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationCenterScreen);
