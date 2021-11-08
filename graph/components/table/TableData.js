import React from 'react';

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
import {DataTable} from 'react-native-paper'
import {mainStyles, windowHeight, windowWidth} from "../../../mainStyles";

const TableData = ({title, accessor, data, noZScore}) => {
    const headers = noZScore ? ["Fecha", title] : ["Fecha", title, "Z-Score"];
    const sortedData = data.map(row => ({
        ...row,
        timeRecorded: new Date(row.timeRecorded)
    })).sort((a, b) => a.timeRecorded - b.timeRecorded);

    const itsPar = (index) => {
        return index % 2
    }

    return (
        <View>
            {sortedData.length > 0 ?
                <View style={styles.tableContainer}>
                    <ScrollView>
                        <View style={styles.scrollableTable}>
                            <View style={styles.headersContainer}>
                                {headers.map(header => (
                                    <View style={styles.headerContainer} key={header}>
                                        <View style={styles.dataContainer}>
                                            <Text style={styles.tableHeader}>{header}</Text>
                                        </View>
                                    </View>

                                ))}
                            </View>
                            {sortedData.map((row, index) =>
                                <View style={styles.row} key={'data-'+index}>
                                    <View style={itsPar(index) ? styles.rowContainer : styles.rowImparContainer}>
                                        <View style={styles.dataContainer}>
                                            <Text
                                                style={itsPar(index) ? styles.tableText : styles.tableTextImpar}>{row.timeRecorded.toLocaleDateString('en-GB')}</Text>
                                        </View>
                                    </View>
                                    <View style={itsPar(index) ? styles.rowContainer : styles.rowImparContainer}>
                                        <View style={styles.dataContainer}>
                                            <Text style={itsPar(index) ? styles.tableText : styles.tableTextImpar}>{row[accessor]}</Text>
                                        </View>
                                    </View>
                                    {!noZScore && <View style={itsPar(index) ? styles.rowContainer : styles.rowImparContainer}>
                                        <View style={styles.dataContainer}>
                                            <Text style={itsPar(index) ? styles.tableText : styles.tableTextImpar}>{row.zscore.toFixed(4)}</Text>
                                        </View>
                                    </View>}
                                </View>)}
                        </View>
                    </ScrollView>
                </View>
                :
                <Text style={styles.noDataText}> No hay datos </Text>
            }
        </View>
    )
}

export default TableData;

const styles = StyleSheet.create({
    tableContainer: {
        padding: 0,
        height: windowHeight * 0.75,
        marginTop: 50,
    },
    row: {
        flexDirection: 'row',
        borderBottomColor: mainStyles.lightGrey,
        borderBottomWidth: 1,
    },
    headerContainer: {
        backgroundColor: mainStyles.darkBlue,
        margin: 0,
        flex: 3
    },
    rowContainer: {
        backgroundColor: mainStyles.primary,
        margin: 0,
        flex: 3
    },
    rowImparContainer: {
        backgroundColor: 'white',
        margin: 0,
        flex: 3,
    },
    headersContainer: {
        flexDirection: 'row',
        marginBottom:2
    },
    dataContainer: {
        margin: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tableHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        flexWrap: 'wrap',
        margin: 'auto',
        marginLeft: 15
    },
    tableText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        marginLeft: 5
    },
    tableTextImpar: {
        fontSize: 18,
        color: mainStyles.primary,
        textAlign: 'center',
        marginLeft: 5
    },
    noDataText: {
        marginTop: windowHeight * 0.3,
        textAlign: 'center',
        fontSize: 20,
    }
})
