import React, {useEffect} from "react";
import {StyleSheet, View,  ActivityIndicator} from "react-native";
import {mainStyles, windowHeight} from "../../mainStyles";
import GenericGraph from "./GenericGraph";
import {GENDERS} from "../../constants/PersonalData";
import TableData from "./table/TableData"
const BmiGraph = ({getAverageBmiData, averageBmiData, getUserBmiHistory, userBmiHistory, gender, tableTabSelected}) => {
    useEffect(() => {
        if (!averageBmiData) getAverageBmiData();
        getUserBmiHistory();
    }, [])

    return (
        <View style={(averageBmiData && userBmiHistory) ? '' : styles.activityMonitor}>
            {averageBmiData && userBmiHistory && tableTabSelected &&
            <TableData data={userBmiHistory} title={"IMC"} accessor={"bmi"}/>}
            {averageBmiData && userBmiHistory && !tableTabSelected &&
                <GenericGraph percentileData={averageBmiData}
                              maxY={32}
                              minY={10}
                              yStep={2}
                              yLabel={"IMC"}
                              data={userBmiHistory}
                              zoomOptions={[{min: 0, max: 2}, {min: 0, max: 6},{min: 0, max: 19}]}
                              colors={{grid: gender === GENDERS.MALE ? '#6686CC' : 'pink', stroke: 'red'}}
                />}
            {!averageBmiData && !userBmiHistory && <ActivityIndicator size="large" color={mainStyles.darkBlue}/>}
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

export default BmiGraph;
