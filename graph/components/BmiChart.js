import React, {useEffect} from "react";
import {StyleSheet, View,  ActivityIndicator} from "react-native";
import {mainStyles, windowHeight} from "../../mainStyles";
import GenericGraph from "./GenericGraph";

const BmiChart = ({getAverageBmiData, averageBmiData, getUserBmiHistory, userBmiHistory}) => {
    useEffect(() => {
        if (!averageBmiData) getAverageBmiData();
        getUserBmiHistory();
    }, [])

    return (
        <View style={averageBmiData ? '' : styles.activityMonitor}>
            {averageBmiData && userBmiHistory ?
                <GenericChart percentileData={averageBmiData}
                              maxY={32}
                              minY={10}
                              yStep={2}
                              yLabel={"IMC"}
                              data={userBmiHistory}
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

export default BmiChart;
