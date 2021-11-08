import React, {useEffect} from "react";
import {StyleSheet, View} from "react-native";
import GenericGraph from "./GenericGraph";
import {ActivityIndicator} from "react-native";
import {mainStyles, mainStylesheet, windowHeight} from "../../mainStyles";
import {GENDERS} from "../../constants/PersonalData";
import TableData from "./table/TableData";

const HeightGraph = ({getAverageHeightData, averageHeightData, getUserHeightHistory, userHeightHistory, gender, tableTabSelected}) => {

    useEffect(() => {
        if (!averageHeightData) getAverageHeightData();
        getUserHeightHistory();
    }, [])

    return (
        <View style={(averageHeightData && userHeightHistory) ? '' : styles.activityMonitor}>
            {userHeightHistory && averageHeightData && tableTabSelected && <TableData data={userHeightHistory} title={"Estatura"} accessor={"height"}/>}
            {averageHeightData && userHeightHistory && !tableTabSelected &&
        <GenericGraph percentileData={averageHeightData}
                      maxY={190}
                      minY={40}
                      yStep={10}
                      yLabel={"Estatura (cm)"}
                      data={userHeightHistory}
                      zoomOptions={[{min: 0, max: 2}, {min: 0, max: 6},{min: 0, max: 19}]}
                      colors={{grid: gender === GENDERS.MALE ? '#6686CC' : 'pink', stroke: 'red'}}
        />}
            {!averageHeightData && !userHeightHistory && <ActivityIndicator size="large" color={mainStyles.darkBlue}/>}
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
