import React, {useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput
} from "react-native"
import {mainStyles} from "../../mainStyles";

const RelationshipModal = ({closeModal, modalInfo, setModalInfo, handleAddNewRelationship, searchDoctors}) => {
    const [doctor, setDoctor] = useState(null);
    const [doctorDni, setDoctorDni] = useState("");

    const handleSearchDoctors = () => {
        searchDoctors(doctorDni, res => {
            setDoctor(res);
            setModalInfo({...modalInfo, doctorId: res.id});
        })
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
                            <TouchableOpacity style={[styles.button, styles.cancelButton]}
                                              onPress={handleAddNewRelationship}>
                                <Text style={styles.textStyle}>Agregar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]}
                                              onPress={closeModal}>
                                <Text style={styles.textStyle}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                        </View>
                        </>
                        : <>
                            <TextInput value={modalInfo.doctorId}
                                       onChangeText={text => setDoctorDni(text)}
                                       placeholder={"DNI del doctor"} error={modalInfo.error}/>
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity style={[styles.button, styles.cancelButton]}
                                                  onPress={handleSearchDoctors}>
                                    <Text style={styles.textStyle}>
                                        Buscar
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.cancelButton]}
                                                  onPress={closeModal}>
                                    <Text style={styles.textStyle}>
                                        Cancelar
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
})