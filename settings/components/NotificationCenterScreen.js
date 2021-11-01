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
        }, [notificationSetting])

    const toggleGlobalSwitch = () => {
        saveGlobalNotifications(!notificationSetting.globalNotifications, successGlobalNotificationCallback, errorCallback)

    }
    const toggleVaccineSwitch = () => {
        saveVaccineNotifications(!notificationSetting.vaccineNotifications, successVaccineNotificationCallback, errorCallback)
    }

    const successGlobalNotificationCallback = () => {
    }

    const successVaccineNotificationCallback = () => {
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
                                value={notificationSetting.globalNotifications}
                                activeText={'Si'}
                                inActiveText={'No'}
                                backgroundActive={mainStyles.primary}
                                backgroundInactive={mainStyles.darkGrey}
                                switchBorderRadius={10}
                                innerCircleStyle={{
                                    borderRadius: 10,
                                    borderColor: notificationSetting.globalNotifications ? mainStyles.primary : mainStyles.darkGrey,
                                    margin: 0
                                }}
                            />

                        </View>
                        <Text>Deseo recibir todas las notificaciones que envien los medicos</Text>
                    </View>
                    <View style={styles.notificationInfoContainer}>
                        <View style={styles.notificationContainer}>
                            <Text style={styles.notificationTitle}>Vacunación</Text>
                            <Switch
                                onValueChange={toggleVaccineSwitch}
                                value={notificationSetting.vaccineNotifications}
                                activeText={'Si'}
                                inActiveText={'No'}
                                backgroundActive={mainStyles.primary}
                                backgroundInactive={mainStyles.darkGrey}
                                switchBorderRadius={10}
                                innerCircleStyle={{
                                    borderRadius: 10,
                                    borderColor: notificationSetting.vaccineNotifications ? mainStyles.primary : mainStyles.darkGrey,
                                    margin: 0
                                }}
                            />
                        </View>
                        <Text style={styles.notificationInfoText}>Deseo recibir todas las notificaciones con respecto a mis proximas vacunaciones</Text>
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
