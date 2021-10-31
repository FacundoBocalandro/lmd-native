import React, {useEffect, useState} from "react";
import {Switch} from 'react-native-switch';
import {Alert, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import {mainStyles} from "../../mainStyles";

const NotificationCenterScreen = ({
                                      saveGlobalNotifications,
                                      saveVaccineNotifications,
                                      getNotificationSettings,
                                      notificationSetting
                                  }) => {

    useEffect(() => {
        getNotificationSettings();
        if (notificationSetting) {
            setIsVaccineNotificationEnabled(notificationSetting.globalNotifications);
            setIsVaccineNotificationEnabled(notificationSetting.mainAccordionText);
        } else {
            getNotificationSettings();
            if (notificationSetting) {
                setIsVaccineNotificationEnabled(notificationSetting.globalNotifications);
                setIsVaccineNotificationEnabled(notificationSetting.mainAccordionText);
            }
        }
    }, [])

    const [isGlobalNotificationEnabled, setIsGlobalNotificationEnabled] = useState(false);
    const [isVaccineNotificationEnabled, setIsVaccineNotificationEnabled] = useState(false);

    const toggleGlobalSwitch = () => {
        saveGlobalNotifications(!isGlobalNotificationEnabled, successGlobalNotificationCallback, errorCallback)

    }
    const toggleVaccineSwitch = () => {
        saveVaccineNotifications(!isVaccineNotificationEnabled, successVaccineNotificationCallback, errorCallback)
    }

    const successGlobalNotificationCallback = async () => {
        setIsGlobalNotificationEnabled(previousState => !previousState);
    }

    const successVaccineNotificationCallback = async () => {
        setIsVaccineNotificationEnabled(previousState => !previousState);
    }

    const errorCallback = (err) => {
        Alert.alert("¡Hubo un error actualizando!")
    }

    return (
        <View style={styles.pageContainer}>
            <Text style={styles.title}>Centro de notificaciones</Text>
            {notificationSetting ?
                <View>
                    <View style={styles.notificationInfoContainer}>
                        <View style={styles.notificationContainer}>
                            <Text style={styles.notificationTitle}>Globales</Text>
                            <Switch
                                onValueChange={toggleGlobalSwitch}
                                value={isGlobalNotificationEnabled}
                                activeText={'Si'}
                                inActiveText={'No'}
                                backgroundActive={mainStyles.primary}
                                backgroundInactive={mainStyles.darkGrey}
                                switchBorderRadius={10}
                                innerCircleStyle={{
                                    borderRadius: 10,
                                    borderColor: isGlobalNotificationEnabled ? mainStyles.primary : mainStyles.darkGrey,
                                    margin: 0
                                }}
                            />

                        </View>
                        <Text>Desea recibir todas las notificaciones con respecto a la edad del paciente</Text>
                    </View>
                    <View style={styles.notificationInfoContainer}>
                        <View style={styles.notificationContainer}>
                            <Text style={styles.notificationTitle}>Vacunación</Text>
                            <Switch
                                onValueChange={toggleVaccineSwitch}
                                value={isVaccineNotificationEnabled}
                                activeText={'Si'}
                                inActiveText={'No'}
                                backgroundActive={mainStyles.primary}
                                backgroundInactive={mainStyles.darkGrey}
                                switchBorderRadius={10}
                                innerCircleStyle={{
                                    borderRadius: 10,
                                    borderColor: isVaccineNotificationEnabled ? mainStyles.primary : mainStyles.darkGrey,
                                    margin: 0
                                }}
                            />
                        </View>
                        <Text style={styles.notificationInfoText}>Desea recibir todas las notificaciones con respecto a
                            la
                            edad
                            del paciente</Text>
                    </View>
                </View> : <ActivityIndicator/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        alignSelf: 'center',
        color: mainStyles.darkBlue,
        fontSize: 40,
        fontWeight: 'bold',
        width: '90%',
        textAlign: 'center',
        marginBottom: 30
    },
    notificationInfoContainer: {
        marginBottom: 30,
        padding: 20
    },
    notificationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    notificationTitle: {
        color: mainStyles.darkGrey,
        fontSize: 30,
        fontWeight: 'bold',
        width: '65%',
        marginBottom: 10
    },
    notificationInfoText: {},
    modalButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 25,
        width: 200
    },
    submitButton: {
        backgroundColor: mainStyles.darkBlue,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 25
    },
})


export default NotificationCenterScreen;
