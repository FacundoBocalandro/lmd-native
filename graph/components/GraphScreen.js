import React, {useState} from 'react';
import {mainStyles, windowHeight, windowWidth, isLandscape} from "../../mainStyles";
import {StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, TextInput} from "react-native";
import {Text, Modal} from "react-native";
import WeightGraph from "../containers/WeightGraph";
import PerimeterGraph from "../containers/PerimeterGraph";
import HeightGraph from "../containers/HeightGraph";
import BmiChart from "../containers/BmiGraph";

const GraphScreen = () => {
    const [selectedTab, setSelectedTab] = useState(1)
    const [tableView, setTableView] = useState(false)

    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <TouchableOpacity style={[styles.homeScreenTab, selectedTab === 1 ? styles.selected : '']}
                                  onPress={() => setSelectedTab(1)}>
                    <Text style={styles.homeScreenTabText} onPress={() => setSelectedTab(1)}>Peso</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.homeScreenTab, selectedTab === 2 ? styles.selected : '']}
                                  onPress={() => setSelectedTab(2)}>
                    <Text style={styles.homeScreenTabText} onPress={() => setSelectedTab(2)}>Estatura</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.homeScreenTab, selectedTab === 3 ? styles.selected : '']}
                                  onPress={() => setSelectedTab(3)}>
                    <Text style={styles.homeScreenTabText} onPress={() => setSelectedTab(3)}>Perímetro Cefálico</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.homeScreenTab, selectedTab === 4 ? styles.selected : '']}
                                  onPress={() => setSelectedTab(4)}>
                    <Text style={styles.homeScreenTabText}>IMC</Text>
                </TouchableOpacity>
            </View>
            <View stle={styles.graphContainer}>
                {selectedTab === 1 && <WeightGraph tableTabSelected={tableView} key={'weightGraph'}/>}
                {selectedTab === 2 && <HeightGraph tableTabSelected={tableView} key={'heightGraph'}/>}
                {selectedTab === 3 && <PerimeterGraph tableTabSelected={tableView} key={'perimeterGraph'}/>}
                {selectedTab === 4 && <BmiChart tableTabSelected={tableView} key={'bmiChart'}/>}

            </View>
            {!tableView ?
                <TouchableOpacity
                    style={[styles.homeScreenTab, styles.newDataButtonPortrait, tableView ? styles.selected : '']}
                    onPress={() => setTableView(true)}>
                    <Text style={styles.homeScreenTabText}>Ver tabla</Text>
                </TouchableOpacity> :
                <TouchableOpacity
                    style={[styles.homeScreenTab, styles.newDataButtonPortrait, !tableView ? styles.selected : '']}
                    onPress={() => setTableView(false)}>
                    <Text style={styles.homeScreenTabText}>Ver gráfico</Text>
                </TouchableOpacity>}
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
    bottomTabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
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
        backgroundColor: mainStyles.darkBlue,
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
