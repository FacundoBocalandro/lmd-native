import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View, Alert} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler'
import {mainStyles, mainStylesheet, windowHeight} from "../../mainStyles";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from 'react-router-dom';


const LoginScreen = ({loginUser, loginPending}) => {

    const history = useHistory();
    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    const setField = (fieldName, value) => {
        setForm({...form, [fieldName]: value})
    }

    const isPending = () => {
        return loginPending
    }

    const submitLogin = () => {

        loginUser({
            ...form
        }, () => history.push({pathname: '/', state: {loginSuccess: true}}), err => {
            Alert.alert("Error", err.message)
        })
    }

    return (
        <View style={{...styles.container, ...mainStylesheet.container}}>
            <TouchableOpacity onPress={() => history.replace('/')}>
                <FontAwesomeIcon icon={faArrowLeft} size={20}/>
            </TouchableOpacity>
            <View>
                <Text style={styles.header}>Libreta Médica</Text>
            </View>
            <View>
                <Text style={styles.subHeader}>Iniciar sesión</Text>
            </View>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre de usuario</Text>
                    <TextInput placeholder={"Nombre..."}
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
                               onChangeText={text => setField('password', text)}/>
                </View>
                <TouchableOpacity onPress={submitLogin}
                                  style={isPending() ? {...styles.submitButton, ...styles.buttonPending} : styles.submitButton}
                                  disabled={isPending()}>
                    <Text style={styles.submitButtonText}>Iniciar sesión</Text>

                </TouchableOpacity>
                <View>
                    <Text style={styles.registerText} onPress={() => history.push('/register')}>
                        ¿Aun no tiene un usuario?
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignSelf: 'center',
        color: mainStyles.secondary,
        fontSize: 40,
        fontWeight: 'bold',
        width: '70%',
        textAlign: 'center',
        fontFamily: 'serif'
    },
    inputContainer: {
        marginTop: 10
    },
    label: {
        color: mainStyles.secondary,
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'serif'
    },
    input: {
        backgroundColor: '#EBEBEB',
        borderRadius: 10,
        color: '#000',
        paddingLeft: 10,
        height: .06 * windowHeight
    },
    submitButton: {
        backgroundColor: mainStyles.secondary,
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

    },
    subHeader: {
        alignSelf: 'center',
        color: mainStyles.secondary,
        fontSize: 35,
        fontWeight: 'bold',
        width: '50%',
        textAlign: 'center',
        fontFamily: 'serif'
    }
});


export default LoginScreen;
