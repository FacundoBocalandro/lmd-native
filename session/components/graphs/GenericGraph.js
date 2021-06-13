import React, {useState} from 'react';
import {StyleSheet, View, Dimensions} from "react-native";
import {
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryLine,
    VictoryTooltip,
    createContainer,
    VictoryScatter} from "victory-native";
import {windowHeight, windowWidth} from "../../../mainStyles";

const GraphScreen = ({percentileData, maxY, yStep, yLabel, data, colors}) => {

    const isLandscape = () => {
        const dim = Dimensions.get('screen');
        return dim.width >= dim.height;
    };

    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
    const commonLineProps = (percentile) => ({
        labelComponent: <VictoryLabel style={{fontSize: 8, fontWeight: 'bold'}} dy={-3}/>,
        labels: ({datum}) => datum.x === 18.5 ? percentile : ''
    })

    return (
        <View>
            <VictoryChart containerComponent={<VictoryZoomVoronoiContainer
                labels={({datum}) => `${Math.round(datum.x, 2)}, ${Math.round(datum.y, 2)}`}
                labelComponent={<VictoryTooltip centerOffset={{ x: 5 }} style={{fontSize: 8}}/>}
            />} width={isLandscape() ? (windowHeight * 0.9): windowWidth} height={isLandscape() ? (windowWidth*0.8) : (windowHeight*0.8)} minDomain={{x: 0}} maxDomain={{x: 19, y: maxY}}>

                <VictoryAxis crossAxis
                             minDomain={0}
                             maxDomain={19}
                             tickValues={Array(115).fill(0).map((value, index) => (19 / 114) * index)}
                             tickFormat={value => value % 1 === 0 ? value : ''}
                             style={{tickLabels: {fontSize: 10}, grid: {stroke: colors.grid}, axisLabel: {fontSize: 15, padding: 30}}}
                             standalone={false}
                             label={"Edad (años)"}
                />
                <VictoryAxis dependentAxis crossAxis
                             style={{tickLabels: {fontSize: 10}, grid: {stroke: colors.grid}, axisLabel: {fontSize: 15, padding: 20}}}
                             standalone={false}
                             maxDomain={maxY}
                             tickValues={Array((maxY * 4 / yStep) + 1).fill(0).map((value, index) => (yStep/4)*index)}
                             tickFormat={value => value % yStep === 0 ? value : ''}
                             label={yLabel}
                             axisLabelComponent={<VictoryLabel dy={-10}/>}
                />
                <VictoryLine data={percentileData.percentile97} {...commonLineProps('97')} style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>
                <VictoryLine data={percentileData.percentile90} {...commonLineProps('90')} style={{data: {strokeWidth: .7}}}/>
                <VictoryLine data={percentileData.percentile75} {...commonLineProps('75')} style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>
                <VictoryLine data={percentileData.percentile50} {...commonLineProps('50')} style={{data: {strokeWidth: 1.5}}}/>
                <VictoryLine data={percentileData.percentile25} {...commonLineProps('25')} style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>
                <VictoryLine data={percentileData.percentile10} {...commonLineProps('10')} style={{data: {strokeWidth: .7}}}/>
                <VictoryLine data={percentileData.percentile3} {...commonLineProps('3')} style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>
                <VictoryScatter style={{data: {fill: "#c43a31"}}} size={2} data={data}/>
            </VictoryChart>
        </View>
    )
}

export default GraphScreen;
