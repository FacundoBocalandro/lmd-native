import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native"
import {mainStyles, windowHeight, windowWidth} from "../../mainStyles";
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const VaccineInformationScreen = (historyData) => {
    const history = useHistory();
    const vaccine = historyData.location.state;

    return (
        <View>
            <TouchableOpacity onPress={() => history.goBack()} style={styles.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} size={25} color={'grey'}/>
            </TouchableOpacity>
            <Text style={styles.title} >{vaccine.name}</Text>
        </View>
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
        fontSize: 40,
        fontWeight: 'bold',
        width: '70%',
        textAlign: 'center',
        marginBottom: 10
    },
})
export default VaccineInformationScreen;

