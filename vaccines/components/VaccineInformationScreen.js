import React, {useEffect} from 'react';
import {
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from "react-native"
import {mainStyles} from "../../mainStyles";
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const VaccineInformationScreen = ({getVaccineDetails, vaccineId, vaccineDetails}) => {
    const history = useHistory();

    useEffect(() => {
        if (vaccineId) {
            getVaccineDetails(vaccineId);
        }
    }, [vaccineId])

    return (
        vaccineDetails ?
            <ScrollView >
                <TouchableOpacity onPress={() => history.goBack()} style={styles.backButton}>
                    <FontAwesomeIcon icon={faArrowLeft} size={25} color={'grey'}/>
                </TouchableOpacity>
                <Text style={styles.title}>{vaccineDetails.vaccineName}</Text>
                <Text style={styles.info}>{vaccineDetails.description}</Text>
                <Text style={styles.subtitle}>Efectos secundarios</Text>
                <Text style={styles.info}>{vaccineDetails.sideEffects}</Text>
            </ScrollView> : <Text>{JSON.stringify(vaccineDetails)}</Text>
    )

}

const styles = StyleSheet.create({

    backButton: {
        margin: 10,
        marginBottom: 0
    },
    title: {
        alignSelf: 'center',
        color: mainStyles.darkBlue,
        fontSize: 30,
        fontWeight: 'bold',
        width: '70%',
        textAlign: 'center',
        marginBottom: 10
    },
    subtitle: {
        alignSelf: 'center',
        color: mainStyles.darkBlue,
        fontSize: 30,
        fontWeight: 'bold',
        width: '70%',
        textAlign: 'center',
        marginBottom: 10
    },
    info: {
        color: 'black',
        fontSize: 20,
        width: '90%',
        marginBottom: 30,
        marginHorizontal: 20
    },
})
export default VaccineInformationScreen;

