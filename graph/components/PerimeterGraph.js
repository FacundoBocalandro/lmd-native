import React, {useEffect} from "react";

import GenericGraph from "./GenericGraph";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {mainStyles} from "../../mainStyles";

const data = Array(36).fill().map((value, index) => ({x: (19 / 228) * index + 8, y: 43 + 0.15 * index}))

const PerimeterGraph =  ({getAveragePerimeterData, averagePerimeterData, getUserPerimeterHistory, userPerimeterHistory})=> {

        useEffect(() => {
        if (!averagePerimeterData) getAveragePerimeterData();
        getUserPerimeterHistory();
    }, [])
    return (
        <View style={averagePerimeterData ? '' : styles.activityMonitor}>
            {averagePerimeterData ?
                <GenericGraph percentileData={averagePerimeterData}
                              maxY={60}
                              minY={28}
                              yStep={2}
                              yLabel={"Perímetro Cefálico (cm)"}
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
        flexDirection: "row",
        // justifyContent: "space-around",
        padding: 10
    }
})

export default PerimeterGraph;
