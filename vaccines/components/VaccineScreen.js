import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View, StyleSheet, TouchableOpacity, Modal, TextInput} from "react-native"
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {mainStyles, windowHeight, windowWidth} from "../../mainStyles";
import {DataTable} from 'react-native-paper'

const initialFormState = {
    date: "",
    weight: "",
    height: "",
    head: "",
}
const initialErrorState = {
    date: false,
    weight: false,
    height: false,
    head: false,
}

const VaccineScreen = ({allVaccines, usersVaccines, getUsersVaccines, getAllVaccines}) => {

    useEffect(() => {
        getUsersVaccines();
        getAllVaccines();
        console.log(allVaccines)
    }, [])

    const [modalVisible, setModalVisible] = useState(false);
    const [form, setForm] = useState(initialFormState)
    const [errors, setErrors] = useState(initialErrorState)

    const vaccines = [
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

    const setField = (fieldName, value) => {
        if (errors[fieldName]) {
            setErrors({...errors, [fieldName]: false})
        }
        setForm({...form, [fieldName]: value})
    }

    const cancelForm = () => {
        setForm(initialFormState);
        setErrors(initialErrorState)
        setModalVisible(!modalVisible);
    }

    const validateDate = (values) => {
        return !!values.date && (new RegExp("^(?:31([/\\-.])(?:0?[13578]|1[02])\\1|(?:29|30)([/\\-.])(?:0?[13-9]|1[0-2])\\2)(?:1[6-9]|[2-9]\\d)?\\d{2}$|^29([/\\-.])0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))$|^(?:0?[1-9]|1\\d|2[0-8])([/\\-.])(?:0?[1-9]|1[0-2])\\4(?:1[6-9]|[2-9]\\d)?\\d{2}$"))
            .test(values.date)
    }

    const validateWeight = (values) => {
        return values.weight > 0;
    }

    const validateHeight = (values) => {
        return values.height > 0;
    }

    const validateHead = (values) => {
        return values.head > 0;
    }

    const rules = {
        date: validateDate,
        weight: validateWeight,
        height: validateHeight,
        head: validateHead,
    }

    const submitForm = () => {
        let newErrors = {...errors};
        Object.entries(rules).forEach(([field, isValid]) => {
            newErrors = {...newErrors, [field]: !isValid(form)}
        })

        if (!Object.values(newErrors).some(error => error)) {
            setModalVisible(!modalVisible)
            const dateParts = form.date.split("/");
            console.log("no hay errores")
            setErrors(initialErrorState);
            setForm(initialFormState);
            // sendData({...form, birthDate: new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).toISOString().substring(0,10)}, () => , err => {Alert.alert("Error", err.message)})
        } else {
            setErrors(newErrors)
        }
    }

    const userHasVaccine = (vaccine) => {
        return (usersVaccines.filter(v => v.vaccineDto.id === vaccine.id).length > 0);
    }

    return (
        <View style={styles.pageContainer}>
            <Text style={styles.title}>Vacunas</Text>
            <DataTable style={styles.tableContainer}>
                <ScrollView>
                    <View style={styles.scrollableTable}>
                        {allVaccines?.map(vaccine => (
                            <DataTable.Row style={styles.vaccineContainer}>
                                <DataTable.Cell style={styles.vaccineNameContainer}>
                                    <View style={styles.vaccineDataContainer}>
                                        <Text style={styles.vaccineName}>{vaccine.name}</Text>
                                    </View>
                                </DataTable.Cell>
                                <DataTable.Cell style={styles.iconContainer}>
                                    <FontAwesomeIcon
                                    icon={userHasVaccine(vaccine) ? faCheckCircle : faTimesCircle}
                                    style={userHasVaccine(vaccine) ? styles.iconGreen : styles.iconRed}
                                    size={30}
                                    onPress={() => setModalVisible(!modalVisible)}
                                    />
                                </DataTable.Cell>
                            </DataTable.Row>

                        ))}
                    </View>
                </ScrollView>
            </DataTable>
            <Modal animationType="slide"
                   transparent={true}
                   visible={modalVisible}
                   onRequestClose={() => {
                       Alert.alert("Modal has been closed.");
                       setModalVisible(!modalVisible);
                   }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Fecha</Text>
                        <TextInput placeholder={"DD/MM/AAAA"}
                                   style={errors.date ? {...styles.input, ...styles.errorInput} : styles.input}
                                   value={form.date}
                                   onChangeText={text => setField('date', text)}/>
                        <Text style={styles.modalText}>Peso</Text>
                        <TextInput placeholder={"kg"}
                                   style={errors.weight ? {...styles.input, ...styles.errorInput} : styles.input}
                                   value={form.weight}
                                   type="number"
                                   onChangeText={text => setField('weight', text)}/>
                        <Text style={styles.modalText}>Estatura</Text>
                        <TextInput placeholder={"cm"}
                                   style={errors.height ? {...styles.input, ...styles.errorInput} : styles.input}
                                   value={form.height}
                                   type="number"
                                   onChangeText={text => setField('height', text)}/>
                        <Text style={styles.modalText}>Perímetro Cefálico</Text>
                        <TextInput placeholder={"cm2"}
                                   style={errors.head ? {...styles.input, ...styles.errorInput} : styles.input}
                                   value={form.head}
                                   type="number"
                                   onChangeText={text => setField('head', text)}/>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.submitButton]}
                                onPress={() => submitForm()}
                            >
                                <Text style={styles.textStyle}>Cargar datos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => cancelForm()}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>

    )
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        color: mainStyles.darkBlue,
        fontSize: 40,
        fontWeight: 'bold',
        width: '70%',
        textAlign: 'center',
        marginBottom: 10
    },
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
        height: windowHeight * 0.75
    },
    vaccineContainer: {
        borderWidth: 3,
        borderColor: mainStyles.darkBlue,
        height: 65,
        width: windowWidth * 0.9,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 0
    },
    vaccineNameContainer: {
        justifyContent: 'center',
        backgroundColor: mainStyles.primary,
        margin: 0,
        padding: 10
    },
    vaccineDataContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    vaccineName: {
        fontSize: 20,
        fontWeight: 'bold',
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
    },
    newDataButtonPortrait: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 125,
        left: 10,
        borderRadius: 50,
        backgroundColor: mainStyles.darkBlue,
        width: 50,
        height: 50,
    },
    newDataButtonLandscape: {
        position: 'absolute',
        right:-15,
        top: -2,
        borderRadius: 50,
        backgroundColor: mainStyles.darkBlue,
        width: 50,
        height: 50,
    },
    newDataButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 50,
        lineHeight: 50
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        // alignItems: 'l',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        // elevation: 5
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    submitButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 25,
        backgroundColor: mainStyles.darkBlue,
        width: 160
    },
    cancelButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 25,
        backgroundColor: mainStyles.primary,
        width: 160
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginTop: 15,
        textAlign: 'left'
    },
    label: {
        textAlign: 'left'
    },
    input: {
        borderWidth: 1,
        borderColor: mainStyles.inputBackground,
        borderRadius: 10,
        color: '#000',
        paddingLeft: 10,
        height: .04 * windowHeight
    },
    errorInput: {
        borderColor: 'rgba(255,0,0,.3)',
    }
})

export default VaccineScreen;
