import React, {useEffect} from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";

import GenericGraph from "./GenericGraph";
import DelayedRendering from "../../common/components/delayed-rendering/DelayedRendering";
import {mainStyles, windowHeight} from "../../mainStyles";

const data = Array(36).fill().map((value, index) => ({x: (19 / 228) * index + 8, y: 30 + 0.3 * index ^ 2}))


const WeightGraph = ({getAverageWeightData, averageWeightData, getUserWeightHistory, userWeightHistory}) => {
    useEffect(() => {
        if (!averageWeightData) {
            getAverageWeightData()
            ;}
        getUserWeightHistory();
    }, [])

    return (
        <View style={averageWeightData ? '' : styles.activityMonitor}>
            {
            averageWeightData ?
            <GenericGraph percentileData={averageWeightData}
                          maxY={90}
                          yStep={5}
                          yLabel={"Peso (kg)"}
                          data={data}
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
