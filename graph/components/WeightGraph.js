import React, {useEffect} from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";

import GenericGraph from "./GenericGraph";
import DelayedRendering from "../../common/components/delayed-rendering/DelayedRendering";
import {mainStyles, windowHeight} from "../../mainStyles";


const WeightGraph = ({getAverageWeightData, averageWeightData, getUserWeightHistory, userWeightHistory}) => {
    useEffect(() => {
        if (!averageWeightData) getAverageWeightData()
        getUserWeightHistory();
    }, [])

    return (
        <View style={averageWeightData ? '' : styles.activityMonitor}>
            {
            averageWeightData && userWeightHistory ?
            <GenericGraph percentileData={averageWeightData}
                          maxY={90}
                          yStep={5}
                          yLabel={"Peso (kg)"}
                          data={userWeightHistory}
                          colors={{grid: '#649CCD', stroke: 'red'}}/>
                : <ActivityIndicator size="large" color={mainStyles.darkBlue}/>

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


export default WeightGraph;
