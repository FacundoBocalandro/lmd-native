import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from "react-native"
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {mainStyles} from "../../mainStyles";
import {Card} from "react-native-paper";

const HitosScreen = ({getHitos, hitos}) => {
    const history = useHistory();

    useEffect(() => {
        getHitos();
    }, [])

    return (
        hitos ?
            <ScrollView>
                <TouchableOpacity onPress={() => history.replace('/main/home')} style={styles.backButton}>
                    <FontAwesomeIcon icon={faArrowLeft} size={25} color={'grey'}/>
                </TouchableOpacity>
                <Card style={styles.card}>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{hitos.age}</Text>
                </View>
                    <ScrollView>
                        <Text style={styles.info}> A esta edad debería llamar la atención...</Text>
                        <Text style={styles.info}> {hitos.body} </Text>
                    </ScrollView>
                </Card>
            </ScrollView> : <ActivityIndicator/>
    )
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 23,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    titleContainer: {
        alignSelf: 'center',
        width: '95%',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10,
        backgroundColor: mainStyles.darkBlue,
        padding: 14,
        borderRadius: 10
    },
    card: {
      padding: 10,
      margin: 15
    },
    info: {
        color: 'black',
        fontSize: 20,
        width: '95%',
        marginBottom: 30,
        marginHorizontal: 20
    },
})

export default HitosScreen;
