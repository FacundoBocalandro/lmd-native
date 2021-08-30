import React, {useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    ActivityIndicator,
    Alert
} from "react-native"
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {mainStyles, windowHeight, windowWidth} from "../../mainStyles";
import {DataTable} from 'react-native-paper'
import {useHistory} from "react-router-dom";

const initialFormState = {
    date: "",
}
const initialErrorState = {
    date: false,
}


const VaccineScreen = ({allVaccines, userVaccines, getUserVaccines, getAllVaccines, setVaccineId, addAppliedVaccine, loading}) => {
    const history = useHistory();

    useEffect(() => {
        if (!allVaccines) getAllVaccines();
        getUserVaccines();
    }, [])

    const appliedVaccineIds = userVaccines?.filter(vaccine => vaccine.hasBeenApplied).map(vaccine => vaccine.vaccineDto.id);

    const [modalVisible, setModalVisible] = useState(false);
    const [form, setForm] = useState(initialFormState)
    const [errors, setErrors] = useState(initialErrorState)
    const [currentVaccine, setCurrentVaccine] = useState()

    const openModal = (vaccine) => {
        if (!userHasVaccine(vaccine.id)) {
            setCurrentVaccine(vaccine);
            setModalVisible(!modalVisible);
        }
    }

    const setField = (fieldName, value) => {
        if (errors[fieldName]) {
            setErrors({...errors, [fieldName]: false})
        }
        setForm({...form, [fieldName]: value})
    }

    const cancelForm = () => {
        setCurrentVaccine(undefined)
        setForm(initialFormState);
        setErrors(initialErrorState)
        setModalVisible(!modalVisible);
    }

    const validateDate = (values) => {
        return !!values.date && (new RegExp("^(?:31([/\\-.])(?:0?[13578]|1[02])\\1|(?:29|30)([/\\-.])(?:0?[13-9]|1[0-2])\\2)(?:1[6-9]|[2-9]\\d)?\\d{2}$|^29([/\\-.])0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))$|^(?:0?[1-9]|1\\d|2[0-8])([/\\-.])(?:0?[1-9]|1[0-2])\\4(?:1[6-9]|[2-9]\\d)?\\d{2}$"))
            .test(values.date)
    }

    const rules = {
        date: validateDate,
    }

    const submitForm = () => {
        let newErrors = {...errors};
        Object.entries(rules).forEach(([field, isValid]) => {
            newErrors = {...newErrors, [field]: !isValid(form)}
        })

        if (!Object.values(newErrors).some(error => error)) {
            setModalVisible(!modalVisible)
            const dateParts = form.date.split("/");
            addAppliedVaccine({
                appliedDate: new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).toISOString().substring(0, 10),
                vaccineId: currentVaccine.id
            }, successCallBack, errorCallback)
        } else {
            setErrors(newErrors)
        }
    }

    const userHasVaccine = (vaccineId) => {
        return appliedVaccineIds.includes(vaccineId);
    }

    const successCallBack = () => {
        getUserVaccines();
        setErrors(initialErrorState);
        setForm(initialFormState);
        setCurrentVaccine(undefined);
    }

    const errorCallback = () => {
        Alert.alert("Hubo un error cargando la vacuna. Por favor intentelo nuevamente");
    }

    const openVaccineInfo = (vaccine)  => {
        setVaccineId(vaccine.id);
        history.push('/main/vaccine/info');
    }

    return userVaccines ? (
        <View>
            {loading ?
                <ActivityIndicator/> :
                <View style={styles.pageContainer}>
                    <Text style={styles.title}>Vacunas</Text>
                    <DataTable style={styles.tableContainer}>
                        <ScrollView>
                            <View style={styles.scrollableTable}>
                                {allVaccines.vaccines?.map(vaccine => (
                                    <DataTable.Row style={styles.vaccineContainer} key={vaccine.id}>
                                        <DataTable.Cell style={styles.vaccineNameContainer} onPress={() => openVaccineInfo(vaccine)}>
                                            <View style={styles.vaccineDataContainer}>
                                                <Text style={styles.vaccineName}>{vaccine.name}</Text>
                                            </View>
                                        </DataTable.Cell>
                                        <DataTable.Cell style={styles.iconContainer} onPress={() => openModal(vaccine)}>
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                style={userHasVaccine(vaccine.id) ? styles.iconGreen : styles.iconRed}
                                                size={30}
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
                               setModalVisible(!modalVisible);
                           }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalTitle}>{currentVaccine?.name}</Text>
                                <Text style={styles.modalText}>Fecha</Text>
                                <TextInput placeholder={"DD/MM/AAAA"}
                                           style={errors.date ? [styles.input, styles.errorInput] : styles.input}
                                           value={form.date}
                                           onChangeText={text => setField('date', text)}/>
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

            }
        </View>
    ) : null
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
        height: 'auto',
        width: windowWidth * 0.9,
        paddingHorizontal: 0
    },
    vaccineNameContainer: {
        backgroundColor: mainStyles.primary,
        margin: 0,
        padding: 10,
        flex: 3
    },
    vaccineDataContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    vaccineName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        flexWrap: 'wrap'
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconRed: {
        color: '#EBEBEB',
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
        right: -15,
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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
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
        borderColor: mainStyles.background,
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
