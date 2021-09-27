import React, {useEffect} from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";

import GenericGraph from "./GenericGraph";
import {mainStyles, windowHeight} from "../../mainStyles";
import {GENDERS} from "../../constants/PersonalData";
import TableData from "./table/TableData";


const WeightGraph = ({
                         getAverageWeightData,
                         averageWeightData,
                         getUserWeightHistory,
                         userWeightHistory,
                         tableTabSelected,
                         gender
                     }) => {
    useEffect(() => {
        if (!averageWeightData) getAverageWeightData()
        getUserWeightHistory();
    }, [])

    return (
        <View style={(averageWeightData && userWeightHistory) ? '' : styles.activityMonitor}>
            {averageWeightData && userWeightHistory && tableTabSelected &&
            <TableData data={userWeightHistory} title={"Peso"} accessor={"weight"}/>}
            {averageWeightData && userWeightHistory && !tableTabSelected &&
                <GenericGraph percentileData={averageWeightData}
                              maxY={90}
                              yStep={5}
                              yLabel={"Peso (kg)"}
                              data={userWeightHistory}
                              zoomOptions={[{min: 0, max: 2}, {min: 0, max: 6},{min: 0, max: 19}]}
                              colors={{grid: gender === GENDERS.MALE ? '#6686CC' : 'pink', stroke: 'red'}}
                />}
            { !averageWeightData && !userWeightHistory && <ActivityIndicator size="large" color={mainStyles.darkBlue}/>}
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


export default WeightGraph;
