import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator} from "react-native";
import {mainStyles, windowHeight} from "../../mainStyles";
import {
    BirthControl,
    BirthType,
    BirthPlace, BirthPresentation,
    BirthIntervention,
} from "../../constants/Prenatal";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const PrenatalProfileScreen = ({
                                   data,
                                   getPrenatalData,
                               }) => {

    useEffect(() => {
        getPrenatalData();
    }, [])

    const [birthVisible, setBirthVisible] = useState(false);
    const [pregnancyVisible, setPregnancyVisible] = useState(false);
    const [postpartumVisible, setPostpartumVisible] = useState(false);
    const [perinatalVisible, setPerinatalVisible] = useState(false);
    const [bornVisible, setBornVisible] = useState(false);
    const [measurementsVisible, setMeasurementsVisible] = useState(false);
    const [diagnosisVisible, setDiagnosisVisible] = useState(false);
    const [inquiriesVisible, setInquiriesVisible] = useState(false);


    const getBirthControl = (birthControl) => {
        if (birthControl === "CONTROLADO") return BirthControl.CONTROLADO
        if (birthControl === "NO_CONTROLADO") return BirthControl.NO_CONTROLADO
        if (birthControl === "CINCO_O_MAS_CONTROLES") return BirthControl.CINCO_O_MAS_CONTROLES;
        else return "-"
    }

    const getBirthPlace = (birthPlace) => {
        if (birthPlace === "INSTITUCIONAL") return BirthPlace.INSTITUCIONAL
        if (birthPlace === "DOMICILIO") return BirthPlace.DOMICILIO
        else return "-"
    }

    const getBirthType = (type) => {
        if (type === "CEFALICA") return BirthType.CEFALICA
        if (type === "PODALICA") return BirthType.PODALICA
        else return "-"
    }

    const getBirthPresentation = (presentation) => {
        if (presentation === "CEFALICA") return BirthPresentation.CEFALICA
        if (presentation === "PODALICA") return BirthPresentation.PODALICA
        else return "-"
    }

    const getBirthIntervention = (birthIntervention) => {
        if (birthIntervention === "EUTOCITO") return BirthIntervention.EUTOCITO
        if (birthIntervention === "DISTOCITO") return BirthIntervention.DISTOCITO
        else return "-"
    }

    return (
        data ?
            <View
                style={{backgroundColor: '#fff', marginBottom: 410}}
            >
                <View>
                    <View>
                        <Text style={styles.header}>Información perinatal</Text>
                    </View>
                    <View style={styles.mainContainer}>
                        <ScrollView>
                            <TouchableOpacity style={styles.mainAccordionExpand}
                                              onPress={() => setPerinatalVisible(!perinatalVisible)}>
                                <Text style={styles.mainAccordionText}>Antecedentes perinatales</Text>
                            </TouchableOpacity>
                            {perinatalVisible && <View style={styles.accordionContainer}>


                                <TouchableOpacity style={styles.accordionExpand}
                                                  onPress={() => setPregnancyVisible(!pregnancyVisible)}>
                                    <Text style={styles.accordionText}>Embarazo</Text>
                                </TouchableOpacity>
                                {pregnancyVisible && <View style={styles.accordionContainer}>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Controlado: </Text>
                                        <Text style={styles.option}>{getBirthControl(data.birthControl)}</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Patologías: </Text>
                                        <Text style={styles.option}>{data.pathology ? "Sí" : "No"}</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.label}>Serología/Bacteriología</Text>
                                        <View style={styles.row}>
                                            <View style={styles.inputContainer}>
                                                <Text style={styles.type}>VDRL: </Text>
                                                <Text style={styles.option}>{data.vdrl ? "Sí" : "No"}</Text>
                                            </View>
                                            <View style={styles.inputContainer}>
                                                <Text style={styles.type}>Chagas: </Text>
                                                <Text style={styles.option}>{data.chagas ? "Sí" : "No"}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.inputContainer}>
                                                <Text style={styles.type}>Toxoplasmosis: </Text>
                                                <Text style={styles.option}>{data.toxoplasmosis ? "Sí" : "No"}</Text>
                                            </View>
                                            <View style={styles.inputContainer}>
                                                <Text style={styles.type}>Hepatitis: </Text>
                                                <Text style={styles.option}>{data.hepatitis ? "Sí" : "No"}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.row}>
                                            <View style={styles.inputContainer}>
                                                <Text style={styles.type}>HIV: </Text>
                                                <Text style={styles.option}>{data.hiv ? "Sí" : "No"}</Text>
                                            </View>
                                            <View style={styles.inputContainer}>
                                                <Text style={styles.type}>Estreptococo B: </Text>
                                                <Text style={styles.option}>{data.estreptococoB ? "Sí" : "No"}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>}
                                <TouchableOpacity style={styles.accordionExpand}
                                                  onPress={() => setBirthVisible(!birthVisible)}>
                                    <Text style={styles.accordionText}>Parto</Text>
                                </TouchableOpacity>
                                {birthVisible &&
                                <View style={styles.accordionContainer}>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Lugar: </Text>
                                        <Text style={styles.option}>{getBirthPlace(data.birthPlace)}</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Tipo: </Text>
                                        <Text style={styles.option}>{getBirthType(data.birthType)}</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Presentación: </Text>
                                        <Text
                                            style={styles.option}>{getBirthPresentation(data.birthPresentation)}</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Intervención: </Text>
                                        <Text
                                            style={styles.option}>{getBirthIntervention(data.birthIntervention)}</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Fórceps: </Text>
                                        <Text style={styles.option}>{data.forceps ? "Sí" : "No"}</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Observaciones: </Text>
                                        <Text
                                            style={styles.option}>{data.birthObservations ? data.birthObservations : "No hay observaciones"}</Text>
                                    </View>
                                </View>
                                }
                                <TouchableOpacity style={styles.accordionExpand}
                                                  onPress={() => setPostpartumVisible(!postpartumVisible)}>
                                    <Text style={styles.accordionText}>Puerperio</Text>
                                </TouchableOpacity>
                                {postpartumVisible &&
                                <View style={styles.accordionContainer}>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Puerperio: </Text>
                                        <Text style={styles.option}>{data.postpartumPeriod ? "Sí" : "No"}</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Observaciones: </Text>
                                        <Text
                                            style={styles.option}>{data.postpartumObservations ? data.birthObservations : "No hay observaciones"}</Text>
                                    </View>
                                </View>
                                }
                            </View>}
                            <TouchableOpacity style={styles.mainAccordionExpand}
                                              onPress={() => setBornVisible(!bornVisible)}>
                                <Text style={styles.mainAccordionText}>Recién nacido</Text>
                            </TouchableOpacity>
                            {bornVisible && <View style={styles.accordionContainer}>
                                <TouchableOpacity style={styles.accordionExpand}
                                                  onPress={() => setMeasurementsVisible(!measurementsVisible)}>
                                    <Text style={styles.accordionText}>Mediciones</Text>
                                </TouchableOpacity>
                                {measurementsVisible && <View style={styles.accordionContainer}>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Edad gestacional: </Text>
                                        <Text style={styles.option}>{data.gestationalAge} Sem</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Peso: </Text>
                                        <Text style={styles.option}>{data.weight} g</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Talla: </Text>
                                        <Text style={styles.option}>{data.height} cm</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Perim. cefálico: </Text>
                                        <Text style={styles.option}>{data.perimeter} cm</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Apgar 1': </Text>
                                        <Text style={styles.option}>{data.apgar1Score}</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Apgar 5': </Text>
                                        <Text style={styles.option}>{data.apgar5Score}</Text>
                                    </View>
                                </View>}
                                <TouchableOpacity style={styles.accordionExpand}
                                                  onPress={() => setDiagnosisVisible(!diagnosisVisible)}>
                                    <Text style={styles.accordionText}>Diagnosis</Text>
                                </TouchableOpacity>
                                {diagnosisVisible && <View style={styles.accordionContainer}>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Prematurez: </Text>
                                        <Text style={styles.option}>{data.premature ? "Sí" : "No"}</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Ecografía de caderas: </Text>
                                        <Text style={styles.option}>{data.waistEcography ? "Sí" : "No"}</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Caïda del cordón: </Text>
                                        <Text style={styles.option}>{data.umbilicalCordFell ? "Sí" : "No"}</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Patalogías: </Text>
                                        <Text style={styles.option}>{data.pathologies ? "Sí" : "No"}</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Neonatología: </Text>
                                        <Text style={styles.option}>{data.neonatology ? "Sí" : "No"}</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Estudios realizados: </Text>
                                        {data.noStudies ? <Text style={styles.option}>Ninguno</Text> :
                                        <View>
                                            <Text style={styles.option}>{data.brainEcography}</Text>
                                            <Text style={styles.option}>{data.cardiology}</Text>
                                            {data.otherStudies ? <Text style={styles.option}>{data.otherStudies}</Text> : null}
                                        </View>}
                                    </View>
                                </View>}
                                <TouchableOpacity style={styles.accordionExpand}
                                                  onPress={() => setInquiriesVisible(!inquiriesVisible)}>
                                    <Text style={styles.accordionText}>Pesquisas</Text>
                                </TouchableOpacity>
                                {inquiriesVisible && <View style={styles.accordionContainer}>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Endocrino-metabólicas (FEI): </Text>
                                        <Text style={styles.option}>{data.endocrineMetabolicFEI ? "Sí" : "No"}</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Ausitiva (OEA): </Text>
                                        <Text style={styles.option}>{data.auditory ? "Sí" : "No"}</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Visual (reflejo rojo): </Text>
                                        <Text style={styles.option}>{data.visualRedReflex ? "Sí" : "No"}</Text>
                                    </View>
                                    <View style={[styles.inputContainer, styles.labelContainer]}>
                                        <Text style={styles.label}>Otras pesquisas: </Text>
                                        <Text
                                            style={styles.option}>{data.otherSearches ? data.otherSearches : "-"}</Text>
                                    </View>
                                </View>}
                            </View>}
                        </ScrollView>
                    </View>
                </View>
            </View>
            : <ActivityIndicator size="large" color={mainStyles.darkBlue}/>
    )
}

const styles = StyleSheet.create({
    header: {
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
    mainContainer: {
        alignItems: 'center',
    },
    mainAccordionExpand: {
        alignSelf: 'center',
        backgroundColor: mainStyles.darkBlue,
        width: '100%',
        textAlign: 'center',
        padding: 12,
        margin: 20,
        borderRadius: 10
    },
    accordionExpand: {
        alignSelf: 'center',
        backgroundColor: mainStyles.primary,
        width: '100%',
        textAlign: 'center',
        padding: 8,
        margin: 10,
        borderRadius: 10,
    },
    mainAccordionText: {
    textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        margin: 'auto'
},
    accordionText: {
        textAlign: 'center',
        fontSize: 25,
        color: '#fff',
        margin: 'auto'
    },
    accordionContainer: {
        },
    labelContainer: {
        marginBottom: 20
    },
    inputContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    row: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    type: {
        fontSize: 20,
        color: mainStyles.darkGrey
    },
    option: {
        fontSize: 20,
    },
    label: {
        color: mainStyles.primary,
        fontSize: 20,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: mainStyles.lightGrey,
        borderRadius: 10,
        color: '#000',
        paddingLeft: 10,
        height: .06 * windowHeight,
        fontSize: 15,
    },
});


export default PrenatalProfileScreen;
