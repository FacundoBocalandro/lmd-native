import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {mainStyles} from "../../mainStyles";

const RegisterScreen = () => {
    const [form, setForm] = useState({
        name: "",
        lastName: "",
        dni: "",
        birthDate: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    })

    const [errors, setErrors] = useState({
        name: false,
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

    const validateName = (values) => {
        return !!values.name
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
        //TODO call api to check username
        return !!values.username
    }

    const validatePassword = (values) => {
        //TODO password rules
        return !!values.password
    }

    const validateConfirmPassword = (values) => {
        return !!values.confirmPassword && values.confirmPassword === values.password
    }

    const rules = {
        name: validateName,
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
            //TODO submit form
        } else {
            setErrors(newErrors)
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>Registro de Paciente</Text>
            </View>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput placeholder={"Nombre..."}
                               style={errors.name ? {...styles.input, ...styles.errorInput} : styles.input}
                               value={form.name}
                               onChangeText={text => setField('name', text)}/>
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
                    <TextInput placeholder={"DNI (Sin puntos/espacios)..."}
                               style={errors.dni ? {...styles.input, ...styles.errorInput} : styles.input}
                               keyboardType={'numeric'}
                               value={form.dni}
                               onChangeText={text => setField('dni', text)}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Fecha de Nacimiento</Text>
                    <TextInput style={errors.birthDate ? {...styles.input, ...styles.errorInput} : styles.input}
                               placeholder={"DD/MM/AAAA"}
                               value={form.birthDate}
                               onChangeText={text => setField('birthDate', text)}/>
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
                               onChangeText={text => setField('username', text)}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput placeholder={"Contraseña..."}
                               style={errors.password ? {...styles.input, ...styles.errorInput} : styles.input}
                               value={form.password}
                               onChangeText={text => setField('password', text)}/>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Repetir Contraseña</Text>
                    <TextInput placeholder={"Contraseña..."}
                               style={errors.confirmPassword ? {...styles.input, ...styles.errorInput} : styles.input}
                               value={form.confirmPassword}
                               onChangeText={text => setField('confirmPassword', text)}/>
                </View>
                <TouchableOpacity onPress={submitForm} style={styles.submitButton}>
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
        paddingVertical: 10,
        paddingHorizontal: 20,
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
    },
    submitButton: {
        backgroundColor: mainStyles.secondary,
        borderRadius: 30,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
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
