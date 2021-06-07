import React, {useState} from 'react';
import {mainStylesheet} from "../../mainStyles";
import {StyleSheet, View} from "react-native";
import {
    VictoryChart,
    VictoryScatter,
    VictoryAxis,
    VictoryLabel,
    VictoryLine,
    VictoryTheme,
    VictoryPortal,
    VictoryZoomContainer
} from "victory-native";

const GraphScreen = () => {

    // const [selectedDomain, setSelectedDomain] = useState({
    //     selectedDomain: {}
    // })
    //
    //
    // const handleZoom = (domain) => {
    //     setSelectedDomain({selectedDomain: domain});
    // }

    const data = [
        {x: 1, y: 50},
        {x: 2, y: 53},
        {x: 3, y: 60},
        {x: 4, y: 66},
        {x: 5, y: 70},
        {x: 6, y: 75},
        {x: 7, y: 90},
        {x: 8, y: 92},
        {x: 9, y: 95},
        {x: 10, y: 100},
        {x: 11, y: 102},
        {x: 12, y: 110},
        {x: 13, y: 114},
        {x: 14, y: 115},
        {x: 15, y: 116},
        {x: 16, y: 117},
        {x: 17, y: 118},
        {x: 18, y: 119},
        {x: 19, y: 125, label: "97"},

    ]
    const newData = [
        {x: 1, y: 52},
        {x: 2, y: 60},
        {x: 3, y: 70},
    ]
    return (
        <View style={{...styles.container, ...mainStylesheet.container}}>
            <VictoryChart theme={VictoryTheme.material} containerComponent={
                <VictoryZoomContainer
                    labels={d => `(x=${d.x};y=${d.y})`}
                />

            }
             domain={{x: [0, 19], y: [30, 180]}}
             padding={{right:15}}
            >

                <VictoryAxis
                    // label={"Edad (Años)"}
                    tickValues={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]}
                    fixLabelOverlap
                    label="Edad (Años)"
                    style={{
                        axisLabel: { padding: 30 }
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    label="Altura (cm)"
                    style={{
                        axisLabel: { padding: 30 }
                    }}
                             fixLabelOverlap
                             tickValues={[40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180]}
                />
                <VictoryLine name="percentil-1"
                             data={data}
                             labels={d => d.label}
                             labelComponent={<VictoryPortal><VictoryLabel dx={10} dy={15} /></VictoryPortal>}
                             style={{
                                 parent: {border: "1px dotted #001"},
                                 labels: {fontSize: 12},
                             }}
                />
                <VictoryScatter
                    style={{data: {fill: "#c43a31"}}}
                    size={2}
                    data={newData}/>
            </VictoryChart>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default GraphScreen;
