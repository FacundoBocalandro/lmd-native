import React, {useEffect} from "react";
import {StyleSheet, View,  ActivityIndicator} from "react-native";
import {mainStyles, windowHeight} from "../../mainStyles";
import GenericGraph from "./GenericGraph";
import {GENDERS} from "../../constants/PersonalData";
import {Table} from "./table/Table"
const BmiGraph = ({getAverageBmiData, averageBmiData, getUserBmiHistory, userBmiHistory, gender, tableTabSelected}) => {
    useEffect(() => {
        if (!averageBmiData) getAverageBmiData();
        getUserBmiHistory();
    }, [])

    return (
        <View style={(averageBmiData && userBmiHistory) ? '' : styles.activityMonitor}>
            {averageBmiData && userBmiHistory && tableTabSelected &&
            <Table data={userBmiHistory} title={"Peso"} accessor={"weight"}/>}
            {averageBmiData && userBmiHistory && !tableTabSelected?
                <GenericGraph percentileData={averageBmiData}
                              maxY={32}
                              minY={10}
                              yStep={2}
                              yLabel={"IMC"}
                              data={userBmiHistory}
                              colors={{grid: gender === GENDERS.MALE ? '#6686CC' : 'pink', stroke: 'red'}}
                />
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

export default BmiGraph;
