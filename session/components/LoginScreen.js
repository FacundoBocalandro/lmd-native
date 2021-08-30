import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View, Alert} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler'
import {mainStyles, mainStylesheet, windowHeight} from "../../mainStyles";
import {useHistory} from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {saveNewToken, setSelectedToken} from "../../utils/tokens";

const initialForm = {
    username: "",
    password: ""
}

const LoginScreen = ({login, loginPending, allUsersInfo, getUserInfoFromToken}) => {

    const history = useHistory();
    const [form, setForm] = useState({...initialForm})

    const successCallback = async (token) => {
        await saveNewToken(token)
        history.push("/main/home");
    }

    const errorCallback = (err) => {
        setForm({...initialForm});
        Alert.alert("¡Credenciales incorrectas!")
    }

    const setField = (fieldName, value) => {
        setForm({...form, [fieldName]: value})
    }

    const isPending = () => {
        return loginPending
    }

    const submitLogin = async () => {
        if (!isPending()) {
            let alreadyLoggedInToken;
            if (allUsersInfo) {
                Object.entries(allUsersInfo).forEach(([token, info]) => {
                    if (info.username === form.username) alreadyLoggedInToken = token;
                })
            }

            if (alreadyLoggedInToken) {
                await setSelectedToken(alreadyLoggedInToken, logout);
                history.push('/inicio');
            } else login(form, successCallback, errorCallback)
        }
    }

    return (
        <View style={{...styles.container, ...mainStylesheet.container}}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Libreta Médica</Text>
            </View>
            <View style={styles.logInContainer}>
                <View>
                    <Text style={styles.subHeader}>Iniciar sesión</Text>
                </View>
                <ScrollView>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nombre de usuario</Text>
                        <TextInput placeholder={"Usuario..."}
                                   style={styles.input}
                                   value={form.username}
                                   onChangeText={text => setField('username', text)}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Contraseña</Text>
                        <TextInput placeholder={"Contraseña..."}
                                   style={styles.input}
                                   value={form.password}
                                   secureTextEntry={true}
                                   onChangeText={text => setField('password', text)}
                                   onKeyPress={(event) => {
                                       if (event.key === "Enter") {
                                           submitLogin();
                                       }
                                   }}
                        />
                    </View>
                    <TouchableOpacity onPress={submitLogin}
                                      style={isPending() ? {...styles.submitButton, ...styles.buttonPending} : styles.submitButton} disabled={isPending()}
                    >
                        <Text style={styles.submitButtonText}>Iniciar sesión</Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => history.push('/register')}>
                        <Text style={styles.registerText}>
                            ¿Aún no tiene un usuario?
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        paddingVertical: windowHeight * 0.05,
        display: 'flex'
    },
    header: {
        color: mainStyles.primary,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputContainer: {
        marginTop: 10
    },
    label: {
        color: mainStyles.primary,
        fontSize: 25,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: mainStyles.background,
        borderRadius: 10,
        color: '#000',
        paddingLeft: 10,
        height: .06 * windowHeight
    },
    submitButton: {
        backgroundColor: mainStyles.darkBlue,
        borderRadius: 30,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonPending: {
        opacity: .5,
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 20
    },
    errorInput: {
        backgroundColor: "rgba(255,0,0,.5)",
    },
    registerText: {
        textAlign: 'center',
        color: mainStyles.darkBlue,
        fontSize: 20,
        marginTop: 10
    },
    subHeader: {
        margin: 15,
        alignSelf: 'center',
        color: mainStyles.primary,
        fontSize: 35,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center'
    },
    logInContainer: {
        textAlignVertical: 'center'
    }

});


export default LoginScreen;
