import React, {useEffect} from "react";

import GenericGraph from "./GenericGraph";
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {mainStyles, windowHeight} from "../../mainStyles";

const PerimeterGraph =  ({getAveragePerimeterData, averagePerimeterData, getUserPerimeterHistory, userPerimeterHistory})=> {

        useEffect(() => {
        if (!averagePerimeterData) getAveragePerimeterData();
        getUserPerimeterHistory();
    }, [])
    return (
        <View style={averagePerimeterData ? '' : styles.activityMonitor}>
            {averagePerimeterData && userPerimeterHistory ?
                <GenericGraph percentileData={averagePerimeterData}
                              maxY={60}
                              minY={28}
                              yStep={2}
                              yLabel={"Perímetro Cefálico (cm)"}
                              data={userPerimeterHistory}
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

export default PerimeterGraph;
