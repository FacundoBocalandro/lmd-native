import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {mainStyles, windowHeight} from "../../mainStyles";
import {TouchableOpacity} from 'react-native-gesture-handler'
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {getAvatar} from "../../utils/avatars";
import {useHistory} from "react-router-dom";

const HomeScreen = ({user, getUserData, getHitos, hitos}) => {
    const history = useHistory();

    useEffect(() => {
        if (!user) getUserData();
        getHitos();
    })

    return user ? (
        <View style={{...styles.container, ...mainStyles.container}}>
            <View style={styles.userProfile}>
                <View style={styles.userData}>
                    <Text style={styles.userName}> {user.firstName} {"\n"} {user.lastName}</Text>
                    <Text style={styles.userInfo}> {user.age} </Text>
                    <Text style={styles.userInfo}> {user.dni} </Text>
                </View>
                <View style={styles.userImage}>
                    <FontAwesomeIcon icon={getAvatar(user.avatar)} style={styles.avatar} size={80}/>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => history.replace('/main/graphScreen')} >
                    <Text style={styles.buttonData}>Datos de crecimiento</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => history.replace('/main/notes')}>
                    <Text style={styles.buttonData}>Notas para la consulta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => history.replace('/main/vaccine')}>
                    <Text style={styles.buttonData}>Mis vacunas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => history.replace('/main/readings')}>
                    <Text style={styles.buttonData}>Accesso a lecturas</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.readingView} onPress={() => history.replace('/main/hitos')}>
                <Text style={styles.buttonDataHitos} numberOfLines={5} ellipsizeMode='tail'>{hitos?.body}</Text>
            </TouchableOpacity>
        </View>
    ) : null;
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flex: 1,
        paddingVertical: 20,
        alignContent: "space-between"

    },
    userProfile: {
        marginTop: 0.06 * windowHeight,
        color: 'black',
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userData: {
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 40
    },
    userInfo: {
        fontSize: 25
    },
    userImage: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: mainStyles.darkBlue,
        width: 100,
        height: 100,
        justifyContent: 'center',
        padding: 10
    },
    button: {
        backgroundColor: mainStyles.primary,
        height: 50,
        marginHorizontal: 50,
        marginVertical: 10,
        borderRadius: 20,
        justifyContent: 'center'
    },
    buttonData: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center'
    },
    buttonDataHitos: {
        margin: 5,
        fontSize: 23,
        color: 'white',
    },
    readingView: {
        height: 0.2 *  windowHeight,
        backgroundColor: mainStyles.darkBlue,
        marginHorizontal: 50,
        borderRadius: 20,
        padding: 10,
        justifyContent: 'center'
    },
    buttonContainer: {
        marginVertical: 0.02 * windowHeight
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        aspectRatio: 1,
        color: mainStyles.darkBlue
    }
})

export default HomeScreen;
