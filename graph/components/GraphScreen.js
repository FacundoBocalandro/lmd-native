import React, {useState} from 'react';
import {mainStyles, windowHeight, windowWidth, isLandscape} from "../../mainStyles";
import {StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, TextInput} from "react-native";
import {Text, Modal} from "react-native";
import WeightGraph from "../containers/WeightGraph";
import PerimeterGraph from "../containers/PerimeterGraph";
import HeightGraph from "../containers/HeightGraph";

const initialFormState = {
    weight: "",
    height: "",
    head: "",
}
const initialErrorState = {
    weight: false,
    height: false,
    head: false,
}

const GraphScreen = ({addWeightData, addHeadData, addHeightData}) => {
    const [selectedTab, setSelectedTab] = useState(1)
    const [modalVisible, setModalVisible] = useState(false);
    const [form, setForm] = useState(initialFormState)
    const [errors, setErrors] = useState(initialErrorState)

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

    const validateWeight = (values) => {
        return values.weight > 0 || "";
    }

    const validateHeight = (values) => {
        return values.height > 0 || "";
    }

    const validateHead = (values) => {
        return values.head > 0 || "";
    }

    const rules = {
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
            if (form.weight !== "") addWeightData({weight: form.weight})
            if (form.head !== "") addHeadData({perimeter: form.head})
            if (form.height !== "") addHeightData({height: form.height})

            setModalVisible(!modalVisible)
            setErrors(initialErrorState);
            setForm(initialFormState);
        } else {
            setErrors(newErrors)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.homeScreenTab, selectedTab === 1 ? styles.selected : '']}
                                  onPress={() => setSelectedTab(1)}>
                    <Text style={styles.homeScreenTabText}>Peso</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.homeScreenTab, selectedTab === 2 ? styles.selected : '']}
                                  onPress={() => setSelectedTab(2)}>
                    <Text style={styles.homeScreenTabText}>Estatura</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.homeScreenTab, selectedTab === 3 ? styles.selected : '']}
                                  onPress={() => setSelectedTab(3)}>
                    <Text style={styles.homeScreenTabText}>Perímetro Cefálico</Text>
                </TouchableOpacity>
            </View>
            <View stle={styles.graphContainer}>
                {selectedTab === 1 && <WeightGraph key={'weightGraph'} />}
                {selectedTab === 2 && <HeightGraph key={'heightGraph'} />}
                {selectedTab === 3 && <PerimeterGraph key={'perimeterGraph'} />}
            </View>
            <TouchableOpacity style={isLandscape() ? styles.newDataButtonLandscape : styles.newDataButtonPortrait}
                              onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.newDataButtonText}>+</Text>
            </TouchableOpacity>
            <Modal animationType="slide"
                   transparent={true}
                   visible={modalVisible}
                   onRequestClose={() => {
                       setModalVisible(!modalVisible);
                   }}>
                <KeyboardAvoidingView
                    style={{flex: 1}}
                    behavior={(Platform.OS === 'ios') ? "padding" : null} enabled
                    keyboardVerticalOffset={Platform.select({ios: 80, android: 500})}>

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
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
                </KeyboardAvoidingView>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        height: windowHeight
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: -30,
        marginTop: 5
    },
    homeScreenTab: {
        textAlign: 'center',
        borderRadius: 30,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainStyles.darkBlue,
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        margin: 0
    },
    homeScreenTabText: {
        fontSize: 18,
        color: 'white'
    },
    selected: {
        backgroundColor: mainStyles.primary
    },
    graphContainer: {
        marginHorizontal: 'auto',
        marginTop: -10
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
        marginHorizontal: 20,
        marginBottom: 0,
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
        width: windowWidth * 0.3
    },
    cancelButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 25,
        backgroundColor: mainStyles.primary,
        width: windowWidth * 0.3
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
});

export default GraphScreen;
