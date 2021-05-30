import React, {useState} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {mainStyles} from "../../mainStyles";
import {TouchableOpacity} from 'react-native-gesture-handler'
import { Image } from 'react-native'

const HomeScreen = ({logout}) => {
    const [user] = useState({
        name: "Nicole Fox",
        age: 5,
        dni: 41640283
    })

    return (
        <View style={{...styles.container, ...mainStyles.container}}>
            <View style={styles.userProfile}>
                <View style={styles.userData}>
                    <Text style={styles.userName}> {user.name}</Text>
                    <Text style={styles.userInfo}> {user.age} años - {user.dni} </Text>
                </View>
                <View style={styles.userImage}>
                    <Image source={require('../../assets/avatar.png')} style={styles.image}/>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonData}>Datos de crecimiento</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonData}>Notas para la consulta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonData}>Mis vacunas</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.readingView}>
                <Text style={styles.buttonData}> Accesso rápido a lecturas</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: mainStyles.background,
        paddingVertical: 20,
        alignContent: "space-between"

    },
    userProfile: {
        marginTop: 80,
        color: 'black',
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    userData: {
        marginRight: 20
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
        borderColor: 'black',
        width: 100,
        height: 100
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
    readingView: {
        height: 200,
        backgroundColor: mainStyles.darkBlue,
        marginHorizontal: 50,
        borderRadius: 20,
        justifyContent: 'center'
    },
    buttonContainer: {
        marginVertical: 40
    },
    image: {
        width: '100%',
        height: undefined,
        borderRadius: 50,
        aspectRatio: 1
    }
})

export default HomeScreen;
