import React, {useEffect} from "react";
import {StyleSheet, View} from "react-native";
import GenericGraph from "./GenericGraph";
import {ActivityIndicator} from "react-native";
import {mainStyles, mainStylesheet, windowHeight} from "../../mainStyles";
import {GENDERS} from "../../constants/PersonalData";
import {Table} from "react-native-table-component";

const HeightGraph = ({getAverageHeightData, averageHeightData, getUserHeightHistory, userHeightHistory, gender, tableTabSelected}) => {

    useEffect(() => {
        if (!averageHeightData) getAverageHeightData();
        getUserHeightHistory();
    }, [])

    return (
        <View style={(averageHeightData && userHeightHistory) ? '' : styles.activityMonitor}>
            {averageHeightData && userHeightHistory && tableTabSelected &&
            <Table data={userHeightHistory} title={"Peso"} accessor={"weight"}/>}
            {averageHeightData && userHeightHistory && !tableTabSelected ?
        <GenericGraph percentileData={averageHeightData}
                      maxY={190}
                      minY={40}
                      yStep={10}
                      yLabel={"Estatura (cm)"}
                      data={userHeightHistory}
                      zoomOptions={[{min: 0, max: 2}, {min: 0, max: 6},{min: 0, max: 19}]}
                      colors={{grid: gender === GENDERS.MALE ? '#6686CC' : 'pink', stroke: 'red'}}
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
