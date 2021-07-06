import React, {useEffect} from "react";
import {StyleSheet, View} from "react-native";
import GenericGraph from "./GenericGraph";
import {ActivityIndicator} from "react-native";
import {mainStyles, windowHeight} from "../../mainStyles";

const HeightGraph = ({getAverageHeightData, averageHeightData, getUserHeightHistory, userHeightHistory}) => {

    useEffect(() => {
        if (!averageHeightData) getAverageHeightData();
        getUserHeightHistory();
    }, [])

    return (
        <View style={averageHeightData ? '' : styles.activityMonitor}>
            {averageHeightData && userHeightHistory ?
        <GenericGraph percentileData={averageHeightData}
                      maxY={190}
                      minY={40}
                      yStep={10}
                      yLabel={"Estatura (cm)"}
                      data={userHeightHistory}
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
