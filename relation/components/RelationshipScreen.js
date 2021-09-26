import React, {useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity, Alert, Modal,
} from "react-native"


import {mainStyles} from "../../mainStyles";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPlusCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import RelationshipModal from "./RelationshipModal";

const RelationshipScreen = ({
                                relationships,
                                getAllRelationships,
                                addNewRelationship,
                                deleteRelationship,
                                userInfo,
                                searchDoctors
                            }) => {

    useEffect(() => {
        getAllRelationships();
    }, [])


    const [modalInfo, setModalInfo] = useState({open: false});
    const [deleteRelationshipModalVisible, setDeleteRelationshipModalVisible] = useState(false);
    const [currentRelationship, setCurrentRelationship] = useState(undefined);

    const errorCallback = () => {
        Alert.alert("Error agregando pediatra");
    }

    const successCallback = () => {
        setModalInfo({open: false})
    }

    const handleAddNewRelationship = () => {
        if (!modalInfo.doctorId || relationships.some(doctor => doctor.id === modalInfo.doctorId)) {
            setModalInfo({...modalInfo, error: true})
        } else {
            addNewRelationship({patientId: userInfo.id, doctorId: modalInfo.doctorId}, successCallback, errorCallback)
        }
    }

    const closeModal = () => {
        setModalInfo({open: false});
    }

    const handleDeleteRelationship = (deleteData) => {
        deleteRelationship(deleteData);
        closeDeleteRelationshipModal();
    }

    const openDeleteRelationshipModal = (relationship) => {
        setCurrentRelationship(relationship);
        setDeleteRelationshipModalVisible(true);
    }

    const closeDeleteRelationshipModal = () => {
        setCurrentRelationship(undefined);
        setDeleteRelationshipModalVisible(false);
    }

    return (
        <View>
            {modalInfo.open && <RelationshipModal closeModal={closeModal} modalInfo={modalInfo}
                                                  setModalInfo={setModalInfo}
                                                  handleAddNewRelationship={handleAddNewRelationship} searchDoctors={searchDoctors}/>}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Pediatras vinculados</Text>
                <FontAwesomeIcon icon={faPlusCircle}
                                 size={25}
                                 color={'white'}
                                 onPress={() => setModalInfo({open: true})}/>
            </View>
            <View style={styles.relationshipsContainer}>
                <ScrollView>
                    {relationships?.map(relationship => (
                        <View key={`relationship-${relationship.id}`} style={styles.relationshipContainer}>
                            <TouchableOpacity style={styles.titleTextContainer}>
                                <Text style={styles.doctorNameText}>{relationship.firstName} {relationship.lastName}</Text>
                            </TouchableOpacity>
                            <FontAwesomeIcon icon={faTimesCircle} style={styles.deleteRelationIcon}
                                             onPress={() => openDeleteRelationshipModal(relationship)} size={25}/>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <Modal animationType="slide"
                   transparent={true}
                   visible={deleteRelationshipModalVisible}
                   onRequestClose={() => {
                       closeDeleteRelationshipModal();
                   }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>¿Esta seguro que desea eliminar la vinculacion con {currentRelationship?.firstName} {currentRelationship?.lastName}?</Text>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => closeDeleteRelationshipModal()}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => handleDeleteRelationship({patientId: userInfo.id, doctorId: currentRelationship.id})}
                            >
                                <Text style={styles.textStyle}>Borrar</Text>
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
        color: 'white',
        fontSize: 23,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    titleContainer: {
        alignSelf: 'center',
        width: '80%',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10,
        backgroundColor: mainStyles.darkBlue,
        padding: 14,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    relationshipsContainer: {
        width: '100%',
        height: '80%'
    },
    relationshipContainer: {
        alignSelf: 'center',
        width: '80%',
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: mainStyles.primary,
        padding: 12,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    doctorNameText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 21,
        textAlign: 'center',
    },
    deleteRelationIcon: {
        fontSize: 30,
        color: 'red'
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

export default RelationshipScreen;
