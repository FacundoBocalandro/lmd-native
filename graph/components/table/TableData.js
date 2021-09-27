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

    return (
        <View>
            {sortedData.length > 0 ?
                <DataTable style={styles.tableContainer}>
                    <ScrollView>
                        <View style={styles.scrollableTable}>
                            <DataTable.Row style={styles.headersContainer}>
                                {headers.map(header => (
                                    <DataTable.Cell style={styles.headerContainer} key={header}>
                                        <View style={styles.dataContainer}>
                                            <Text style={styles.tableText}>{header}</Text>
                                        </View>
                                    </DataTable.Cell>

                                ))}
                            </DataTable.Row>
                            {sortedData.map(row =>
                                <DataTable.Row>
                                    <DataTable.Cell style={styles.rowContainer}>
                                        <View style={styles.dataContainer}>
                                            <Text
                                                style={styles.tableText}>{row.timeRecorded.toLocaleDateString('en-GB')}</Text>
                                        </View>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={styles.rowContainer}>
                                        <View style={styles.dataContainer}>
                                            <Text style={styles.tableText}>{row[accessor]}</Text>
                                        </View>
                                    </DataTable.Cell>
                                    {!noZScore && <DataTable.Cell style={styles.rowContainer}>
                                        <View style={styles.dataContainer}>
                                            <Text style={styles.tableText}>{row.zscore}</Text>
                                        </View>
                                    </DataTable.Cell>}
                                </DataTable.Row>)}
                        </View>
                    </ScrollView>
                </DataTable>
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
        marginTop: 40
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
    headersContainer: {
        marginBottom:2
    },
    dataContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    tableText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        flexWrap: 'wrap'
    },

    noDataText: {
        marginTop: windowHeight*0.3,
        textAlign: 'center',
        fontSize: 20,
    }
})
