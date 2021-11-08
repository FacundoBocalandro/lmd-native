import React, {useState} from 'react';
import {mainStyles, windowHeight, windowWidth, isLandscape} from "../../mainStyles";
import {StyleSheet, View, TouchableOpacity, KeyboardAvoidingView, TextInput} from "react-native";
import {Text, Modal} from "react-native";
import WeightGraph from "../containers/WeightGraph";
import PerimeterGraph from "../containers/PerimeterGraph";
import HeightGraph from "../containers/HeightGraph";
import BmiChart from "../containers/BmiGraph";
import {Card, Title, Paragraph} from 'react-native-paper';
import { CheckBox } from 'react-native-elements'

const GraphScreen = () => {
    const [selectedTab, setSelectedTab] = useState(1)
    const [tableView, setTableView] = useState(false)

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <View style={styles.tabContainer}>
                    <View>
                        <View style={styles.checkedContainer}>
                            <CheckBox
                                containerStyle ={{backgroundColor: 'transparent', borderColor: 'transparent'}}
                                textStyle={styles.homeScreenTabText}
                                title={'Peso'}
                                checkedColor={mainStyles.darkBlue}
                                uncheckedColor={mainStyles.grey}
                                checked={selectedTab === 1}
                                onPress={() => setSelectedTab(1)}
                            />
                        </View>
                        <View style={styles.checkedContainer}>
                            <CheckBox
                                containerStyle ={{backgroundColor: 'transparent', borderColor: 'transparent'}}
                                textStyle={styles.homeScreenTabText}
                                title={'Estatura'}
                                checkedColor={mainStyles.darkBlue}
                                uncheckedColor={mainStyles.grey}
                                checked={selectedTab === 2}
                                onPress={() => setSelectedTab(2)}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={styles.checkedContainer}>
                            <CheckBox
                                containerStyle ={{backgroundColor: 'transparent', borderColor: 'transparent'}}
                                textStyle={styles.homeScreenTabText}
                                title={'Perímetro Cefálico'}
                                checkedColor={mainStyles.darkBlue}
                                uncheckedColor={mainStyles.grey}
                                checked={selectedTab === 3}
                                onPress={() => setSelectedTab(3)}
                            />
                        </View>
                        <View style={styles.checkedContainer}>
                            {/*<Text style={styles.homeScreenTabText}>IMC</Text>*/}
                            <CheckBox
                                containerStyle ={{backgroundColor: 'transparent', borderColor: 'transparent'}}
                                textStyle={styles.homeScreenTabText}
                                title={'IMC'}
                                checkedColor={mainStyles.darkBlue}
                                uncheckedColor={mainStyles.grey}
                                checked={selectedTab === 4}
                                onPress={() => setSelectedTab(4)}
                            />
                        </View>
                    </View>
                </View>
            </Card>
            <Card style={styles.card}>
                {!tableView ?
                    <TouchableOpacity
                        style={[styles.homeScreenTab, styles.newDataButtonPortrait, tableView ? styles.selected : '']}
                        onPress={() => setTableView(true)}>
                        <Text style={styles.homeScreenButtonText}>Ver tabla</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity
                        style={[styles.homeScreenTab, styles.newDataButtonPortrait, !tableView ? styles.selected : '']}
                        onPress={() => setTableView(false)}>
                        <Text style={styles.homeScreenButtonText}>Ver gráfico</Text>
                    </TouchableOpacity>}
                <View stle={styles.graphContainer}>
                    {selectedTab === 1 && <WeightGraph tableTabSelected={tableView} key={'weightGraph'}/>}
                    {selectedTab === 2 && <HeightGraph tableTabSelected={tableView} key={'heightGraph'}/>}
                    {selectedTab === 3 && <PerimeterGraph tableTabSelected={tableView} key={'perimeterGraph'}/>}
                    {selectedTab === 4 && <BmiChart tableTabSelected={tableView} key={'bmiChart'}/>}
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flexDirection: 'column',
        height: windowHeight
    },
    card: {
        margin: 10,
        padding: 10
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    bottomTabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    homeScreenTab: {
        textAlign: 'center',
        borderRadius: 10,
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
    },
    homeScreenButtonText: {
        fontSize: 18,
        color: 'white'
    },
    checkedContainer: {
        flexDirection: 'row'
    },
    selected: {
        backgroundColor: mainStyles.primary
    },
    graphContainer: {
        marginHorizontal: 'auto',
        marginTop: -20
    },
    newDataButtonPortrait: {
        marginBottom: -40,
        zIndex: 999,
        alignSelf: 'flex-end',
        backgroundColor: mainStyles.darkBlue,
    },
    newDataButtonLandscape: {
        position: 'absolute',
        right: -15,
        top: -2,
        borderRadius: 20,
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
