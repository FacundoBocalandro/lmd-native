import React, {useEffect} from "react";
import {StyleSheet, View} from "react-native";
import GenericGraph from "./GenericGraph";
import {ActivityIndicator} from "react-native";
import {mainStyles, mainStylesheet, windowHeight} from "../../mainStyles";

const data = Array(36).fill().map((value, index) => ({x: (19 / 228) * index + 8, y: 100 + 0.5 * index ^ 2}))

const HeightGraph = ({getAverageHeightData, averageHeightData, getUserHeightHistory, userHeightHistory}) => {

    useEffect(() => {
        if (!averageHeightData) getAverageHeightData();
        getUserHeightHistory();
    }, [])

    return (
        <View style={averageHeightData ? '' : styles.activityMonitor}>
            {averageHeightData ?
        <GenericGraph percentileData={averageHeightData}
                      maxY={190}
                      minY={40}
                      yStep={10}
                      yLabel={"Estatura (cm)"}
                      data={data}
                      colors={{grid: '#649CCD', stroke: 'red'}}
        /> : <ActivityIndicator size="large" color={mainStyles.darkBlue}/>
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

export default HeightGraph;
