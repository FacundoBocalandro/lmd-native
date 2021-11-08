import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {DataTable} from "react-native-paper";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import {mainStyles, windowHeight, windowWidth} from "../../mainStyles";

const VaccineScreen = ({
                           allVaccines,
                           userVaccines,
                           getUserVaccines,
                           getAllVaccines,
                           setVaccineId,
                           loading
                       }) => {
    const history = useHistory();

    useEffect(() => {
        if (!allVaccines) getAllVaccines();
        getUserVaccines();
    }, [])

    const appliedVaccineDosageIds = userVaccines?.filter(vaccine => vaccine.hasBeenApplied).map(vaccine => {
        return vaccine.dosageDto.id
    });

    const [appliedModalVisible, setAppliedModalVisible] = useState(false);
    const [currentVaccine, setCurrentVaccine] = useState()

    const openModal = (vaccine, dosage) => {
        if (userHasVaccineDosage(dosage.id)) {
            getDosage(dosage);
            setAppliedModalVisible(!appliedModalVisible);
        }
    }

    const closeModal = () => {
        setCurrentVaccine(undefined)
        setAppliedModalVisible(!appliedModalVisible);
    }

    const getDosage = (dosage) => {
        const usersDosage = userVaccines?.filter(vaccine => {
            return vaccine.dosageDto ? (vaccine.dosageDto.id === dosage.id) : false
        });
        setCurrentVaccine(usersDosage[0]);
    }

    const userHasVaccineDosage = (dosageId) => {
        return appliedVaccineDosageIds?.includes(dosageId);
    }

    const openVaccineInfo = (vaccine) => {
        setVaccineId(vaccine.id);
        history.push('/main/vaccine/info');
    }

    const getDate = (date) => {
        if (date) {
            const split = date.split('-');
            return split[2] + "/" + split[1] + "/" + split[0];

        }
    }

    return (
        <View>
            <View style={styles.pageContainer}>
                <Text style={styles.title}>Vacunas</Text>
                {loading ?
                    <ActivityIndicator/> :

                    <DataTable style={styles.tableContainer}>
                        <ScrollView>
                            <View style={styles.scrollableTable}>
                                {allVaccines?.vaccines?.map(vaccine => (
                                    <View style={styles.vaccineContainer} key={vaccine.id}>
                                        <TouchableOpacity style={styles.vaccineNameContainer}
                                                          onPress={() => openVaccineInfo(vaccine)}>
                                            <View style={styles.vaccineDataContainer}>
                                                <Text style={styles.vaccineName}>{vaccine.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <DataTable.Row style={styles.headersContainer}>
                                            {vaccine.dosages?.map(dosage => (
                                                <View style={styles.vaccineDosagesContainer} key={dosage.id}>
                                                    <TouchableOpacity style={styles.iconContainer}
                                                                      onPress={() => openModal(vaccine, dosage)}>
                                                        <FontAwesomeIcon
                                                            icon={faCheckCircle}
                                                            style={userHasVaccineDosage(dosage.id) ? styles.iconGreen : styles.iconRed}
                                                            size={30}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </DataTable.Row>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </DataTable>
                }
                <Modal animationType="slide"
                       transparent={true}
                       visible={appliedModalVisible}
                       onRequestClose={() => {
                           setAppliedModalVisible(!appliedModalVisible);
                       }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>{currentVaccine?.vaccineDto.name}</Text>
                            <Text style={styles.modalText}>Fecha de aplicacion:</Text>
                            <Text style={styles.input}>{getDate(currentVaccine?.appliedDate)} </Text>
                            <Text style={styles.modalText}>Medico responsable:</Text>
                            <Text
                                style={styles.input}>{currentVaccine?.responsibleDoctor.firstName} {currentVaccine?.responsibleDoctor.lastName}</Text>
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.cancelButton]}
                                    onPress={() => closeModal()}
                                >
                                    <Text style={styles.textStyle}>Cerrar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
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
        height: 'auto',
        width: windowWidth * 0.9,
        paddingHorizontal: 0,
    },
    vaccineDosagesContainer: {
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    vaccineNameContainer: {
        backgroundColor: mainStyles.primary,
        margin: 0,
        padding: 10,
        borderRadius: 20
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
        paddingTop: 10,
        borderColor: mainStyles.lightGrey,
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
