import React, {useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput, Alert
} from "react-native"
import {mainStyles} from "../../mainStyles";

const RelationshipModal = ({closeModal, modalInfo, setModalInfo, handleAddNewRelationship, searchDoctors}) => {
    const [doctor, setDoctor] = useState(null);
    const [doctorDni, setDoctorDni] = useState("");

    const handleSearchDoctors = () => {
        searchDoctors(doctorDni, successCallback, errorCallback);
    }

    const successCallback = (res) => {
        setDoctor(res);
        setModalInfo({...modalInfo, doctorId: res.id});
    }

    const errorCallback = (err) => {
        Alert.alert("No se encontró ningun pediatra con ese número de documento");
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            isOpen={true} onRequestClose={closeModal} style={{}}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    {doctor ? <>
                            <View>
                                <Text style={styles.modalTitle}>{doctor.firstName} {doctor.lastName}</Text>
                                <Text style={styles.modalTitle}>{doctor.dni}</Text>
                            </View>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]}
                                              onPress={closeModal}>
                                <Text style={styles.textStyle}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.submitButton]}
                                              onPress={handleAddNewRelationship}>
                                <Text style={styles.textStyle}>Agregar</Text>
                            </TouchableOpacity>
                        </View>
                        </>
                        : <>

                            <TextInput value={modalInfo.doctorId}
                                       style={styles.input}
                                       onChangeText={text => setDoctorDni(text)}
                                       placeholder={"DNI del doctor"} error={modalInfo.error}/>
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]}
                                                  onPress={closeModal}>
                                    <Text style={styles.textStyle}>
                                        Cancelar
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.modalButton, styles.submitButton]}
                                                  onPress={handleSearchDoctors}>
                                    <Text style={styles.textStyle}>
                                        Buscar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>}
                </View>
            </View>
        </Modal>
    )
}

export default RelationshipModal;

const styles = StyleSheet.create({
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
        fontSize: 18,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    modalButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 25,
        width: 160
    },
    cancelButton: {
        backgroundColor: mainStyles.primary,
    },
    submitButton: {
        backgroundColor: mainStyles.darkBlue,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    input: {
        backgroundColor: mainStyles.lightGrey,
        borderRadius: 10,
        padding: 14,
        color: '#000',
    }
})
