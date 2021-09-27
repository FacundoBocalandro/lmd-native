import React, {useEffect} from "react";

import GenericGraph from "./GenericGraph";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {mainStyles, windowHeight} from "../../mainStyles";
import {GENDERS} from "../../constants/PersonalData";
import {Table} from "react-native-table-component";
import TableData from "./table/TableData";

const PerimeterGraph =  ({getAveragePerimeterData, averagePerimeterData, getUserPerimeterHistory, userPerimeterHistory, gender, tableTabSelected})=> {

        useEffect(() => {
        if (!averagePerimeterData) getAveragePerimeterData();
        getUserPerimeterHistory();
    }, [])
    return (
        <View style={(averagePerimeterData && userPerimeterHistory) ? '' : styles.activityMonitor}>
            {userPerimeterHistory && averagePerimeterData &&  tableTabSelected && <TableData data={userPerimeterHistory} title={"Perímetro Céfalico"} accessor={"perimeter"} noZScore/>}
            {averagePerimeterData && userPerimeterHistory && !tableTabSelected &&
                <GenericGraph percentileData={averagePerimeterData}
                              maxY={60}
                              minY={28}
                              yStep={2}
                              yLabel={"Perímetro Cefálico (cm)"}
                              data={userPerimeterHistory}
                              zoomOptions={[{min: 0, max: 2}, {min: 0, max: 6}]} selectedXRange={{min: 0, max: 6}}
                              colors={{grid: gender === GENDERS.MALE ? '#6686CC' : 'pink', stroke: 'red'}}
                              />}
            {!averagePerimeterData && !userPerimeterHistory && <ActivityIndicator size="large" color={mainStyles.darkBlue}/>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    activityMonitor: {
        flex: 1,
        justifyContent: "center",
        paddingTop: windowHeight * 0.3
    }
})

export default PerimeterGraph;
