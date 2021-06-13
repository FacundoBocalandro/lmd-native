import React, {useState} from 'react';
import {ScrollView, Text, View, StyleSheet} from "react-native"
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {mainStyles, windowHeight, windowWidth} from "../../mainStyles";
import {DataTable} from 'react-native-paper'

const VaccineScreen = () => {

    const allVaccines = [
        {name: 'vaccine1', amount: 1, hasVaccine: true},
        {name: 'vaccine2', amount: 1, hasVaccine: true},
        {name: 'vaccine3', amount: 1, hasVaccine: false},
        {name: 'vaccine4', amount: 1, hasVaccine: true},
        {name: 'vaccine5', amount: 1, hasVaccine: false},
        {name: 'vaccine1', amount: 1, hasVaccine: true},
        {name: 'vaccine2', amount: 1, hasVaccine: true},
        {name: 'vaccine3', amount: 1, hasVaccine: false},
        {name: 'vaccine4', amount: 1, hasVaccine: true},
        {name: 'vaccine5', amount: 1, hasVaccine: false},
        {name: 'vaccine1', amount: 1, hasVaccine: true},
        {name: 'vaccine2', amount: 1, hasVaccine: true},
        {name: 'vaccine3', amount: 1, hasVaccine: false},
        {name: 'vaccine4', amount: 1, hasVaccine: true},
        {name: 'vaccine5', amount: 1, hasVaccine: false},
        {name: 'vaccine1', amount: 1, hasVaccine: true},
        {name: 'vaccine1', amount: 1, hasVaccine: true},
        {name: 'vaccine2', amount: 1, hasVaccine: true},
        {name: 'vaccine3', amount: 1, hasVaccine: false},
        {name: 'vaccine4', amount: 1, hasVaccine: true},
        {name: 'vaccine5', amount: 1, hasVaccine: false},
        {name: 'vaccine1', amount: 1, hasVaccine: true},
        {name: 'vaccine2', amount: 1, hasVaccine: true},
        {name: 'vaccine3', amount: 1, hasVaccine: false},
        {name: 'vaccine4', amount: 1, hasVaccine: true},
        {name: 'vaccine5', amount: 1, hasVaccine: false},
        {name: 'vaccine1', amount: 1, hasVaccine: true},
        {name: 'vaccine2', amount: 1, hasVaccine: true},
        {name: 'vaccine3', amount: 1, hasVaccine: false},
        {name: 'vaccine4', amount: 1, hasVaccine: true},
        {name: 'vaccine5', amount: 1, hasVaccine: false},
        {name: 'vaccine1', amount: 1, hasVaccine: true},
    ]

    return (
        <View style={styles.pageContainer}>
            <Text>Vacunas</Text>
            <DataTable style={styles.tableContainer}>
                <ScrollView>
                    <View style={styles.scrollableTable}>
                    {allVaccines.map(vaccine => (
                        <DataTable.Row style={styles.vaccineContainer}>
                            <DataTable.Cell style={styles.vaccineNameContainer}>
                                <View style={styles.vaccineDataContainer}>
                                    <Text style={styles.vaccineName}>{vaccine.name}</Text>
                                    <Text style={styles.vaccineName}>({vaccine.amount})</Text>
                                </View>
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.iconContainer}><FontAwesomeIcon
                                icon={vaccine.hasVaccine ? faCheckCircle : faTimesCircle}
                                style={vaccine.hasVaccine ? styles.iconGreen : styles.iconRed}
                                size={30}
                                onPress={}
                            /></DataTable.Cell>
                        </DataTable.Row>

                    ))}
                    </View>
                </ScrollView>
            </DataTable>


        </View>

    )
}

const styles = StyleSheet.create({
    pageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollableTable: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableContainer: {
        padding: 0,
        height: windowHeight * 0.8
    },
    vaccineContainer: {
        borderWidth: 3,
        borderColor: mainStyles.darkBlue,
        height: 65,
        width: windowWidth * 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0
    },
    vaccineNameContainer: {
        backgroundColor: mainStyles.primary,
        margin: 0,
        padding: 10
    },
    vaccineDataContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    vaccineName: {
        fontSize: 20,
        color: 'white'
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconRed: {
        color: mainStyles.inputBackground,
    },
    iconGreen: {
        color: 'green'
    }
})

export default VaccineScreen;
