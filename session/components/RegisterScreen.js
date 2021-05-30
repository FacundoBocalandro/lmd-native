import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View, Alert} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler'
import {mainStyles, mainStylesheet, windowHeight} from "../../mainStyles";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from 'react-router-dom';


const RegisterScreen = ({registerUser, checkUsernameUsed, checkUsernameUsedPending, checkUsernameUsedError, registerPending}) => {
    const history = useHistory();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        dni: "",
        birthDate: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        dni: false,
        birthDate: false,
        email: false,
        username: false,
        password: false,
        confirmPassword: false
    })

    const setField = (fieldName, value) => {
        if (errors[fieldName]) {
            setErrors({...errors, [fieldName]: false})
        }
        setForm({...form, [fieldName]: value})
    }

    const validateFirstName = (values) => {
        return !!values.firstName
    }

    const validateLastName = (values) => {
        return !!values.lastName
    }

    const validateDni = (values) => {
        return !!values.dni && `${Number.parseInt(values.dni)}` === values.dni
    }

    const validateBirthDate = (values) => {
        return !!values.birthDate && (new RegExp("^(?:31([/\\-.])(?:0?[13578]|1[02])\\1|(?:29|30)([/\\-.])(?:0?[13-9]|1[0-2])\\2)(?:1[6-9]|[2-9]\\d)?\\d{2}$|^29([/\\-.])0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))$|^(?:0?[1-9]|1\\d|2[0-8])([/\\-.])(?:0?[1-9]|1[0-2])\\4(?:1[6-9]|[2-9]\\d)?\\d{2}$"))
            .test(values.birthDate)
    }

    const validateEmail = (values) => {
        return !!values.email && (new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"))
            .test(values.email)
    }

    const validateUsername = (values) => {
        return !!values.username && !errors.username
    }

    const validatePassword = (values) => {
        return !!values.password && (new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
            .test(values.password)
    }

    const validateConfirmPassword = (values) => {
        return !!values.confirmPassword && values.confirmPassword === values.password
    }

    const rules = {
        firstName: validateFirstName,
        lastName: validateLastName,
        dni: validateDni,
        birthDate: validateBirthDate,
        email: validateEmail,
        username: validateUsername,
        password: validatePassword,
        confirmPassword: validateConfirmPassword
    };

    const submitForm = () => {
        let newErrors = {...errors};
        Object.entries(rules).forEach(([field, isValid]) => {
            newErrors = {...newErrors, [field]: !isValid(form)}
        })

        if (!Object.values(newErrors).some(error => error)) {
            const dateParts = form.birthDate.split("/");
            registerUser({...form, birthDate: new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).toISOString().substring(0,10)}, () => history.push({pathname: '/', state: {registerSuccess: true}}), err => {Alert.alert("Error", err.message)})
        } else {
            setErrors(newErrors)
        }
    }

    const isPending = () => {
        return checkUsernameUsedPending || checkUsernameUsedError || registerPending
    }

    return (
        <View style={{...styles.container, ...mainStylesheet.container}}>
            <TouchableOpacity onPress={() => history.replace('/')}>
                <FontAwesomeIcon icon={faArrowLeft} size={20}/>
            </TouchableOpacity>
            <View>
                <Text style={styles.header}>Registro de Paciente</Text>
            </View>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput placeholder={"Nombre..."}
                               style={errors.firstName ? {...styles.input, ...styles.errorInput} : styles.input}
                               value={form.firstName}
                               onChangeText={text => setField('firstName', text)}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Apellido</Text>
                    <TextInput placeholder={"Apellido..."}
                               style={errors.lastName ? {...styles.input, ...styles.errorInput} : styles.input}
                               value={form.lastName}
                               onChangeText={text => setField('lastName', text)}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>DNI</Text>
                    <TextInput placeholder={"DNI..."}
                               style={errors.dni ? {...styles.input, ...styles.errorInput} : styles.input}
                               keyboardType={'numeric'}
                               value={form.dni}
                               onChangeText={text => setField('dni', text)}/>
                    <Text>Sin puntos ni espacios.</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Fecha de Nacimiento</Text>
                    <TextInput style={errors.birthDate ? {...styles.input, ...styles.errorInput} : styles.input}
                               placeholder={"Fecha de Nacimiento..."}
                               value={form.birthDate}
                               onChangeText={text => setField('birthDate', text)}/>
                    <Text>Formato DD/MM/AAAA.</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput placeholder={"Email..."}
                               style={errors.email ? {...styles.input, ...styles.errorInput} : styles.input}
                               value={form.email}
                               onChangeText={text => setField('email', text)}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre de Usuario</Text>
                    <TextInput placeholder={"Nombre de Usuario..."}
                               style={errors.username ? {...styles.input, ...styles.errorInput} : styles.input}
                               value={form.username}
                               onBlur={() => checkUsernameUsed(form.username, res => setErrors({...errors, username: !res}), () => {Alert.alert("Error", "¡Error verificando nombre de usuario!")})}
                               onChangeText={text => setField('username', text)}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput placeholder={"Contraseña..."}
                               style={errors.password ? {...styles.input, ...styles.errorInput} : styles.input}
                               value={form.password}
                               secureTextEntry={true}
                               onChangeText={text => setField('password', text)}/>
                    <Text>8 letras o más, al menos una mayúscula, una minúscula, un número y un carácter especial.</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Repetir Contraseña</Text>
                    <TextInput placeholder={"Contraseña..."}
                               style={errors.confirmPassword ? {...styles.input, ...styles.errorInput} : styles.input}
                               value={form.confirmPassword}
                               secureTextEntry={true}
                               onChangeText={text => setField('confirmPassword', text)}/>
                </View>
                <TouchableOpacity onPress={submitForm} style={isPending() ? {...styles.submitButton, ...styles.buttonPending} : styles.submitButton} disabled={isPending()}>
                    <Text style={styles.submitButtonText}>Registrarse</Text>
                </TouchableOpacity>
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
        backgroundColor: mainStyles.background,
        borderRadius: 10,
        color: '#000',
        paddingLeft: 10,
        height: .06*windowHeight
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
    }
});


export default RegisterScreen;
