import React from 'react';
import {
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryLine,
    VictoryZoomContainer} from "victory-native";
import {windowHeight, windowWidth, isLandscape} from "../../mainStyles";

const GraphScreen = ({percentileData, maxY, minY = 0, yStep, yLabel, data, colors}) => {

    const commonLineProps = (percentile) => {
        const lineData = percentileData[`percentile${percentile}`];

        return {
            labelComponent: <VictoryLabel style={{fontSize: 8, fontWeight: 'bold'}} dy={-3}/>,
            labels: ({datum}) => datum.x === lineData[lineData.length - 5].x ? percentile : ''
        }
    }

    return (
        <VictoryChart
                      containerComponent={<VictoryZoomContainer zoomDomain={{x: [0, 19], y: [0, maxY]}}/>}
                      width={isLandscape() ? (windowHeight * 0.9): windowWidth}
                      height={isLandscape() ? (windowWidth*0.8) : (windowHeight*0.8)}
                      minDomain={{x: 0}} maxDomain={{x: 19, y: maxY}}>
            <VictoryAxis crossAxis
                         minDomain={0}
                         maxDomain={19}
                         tickValues={Array(115).fill(0).map((value, index) => (19 / 114) * index)}
                         tickFormat={value => value % 1 === 0 ? value : ''}
                         style={{tickLabels: {fontSize: 10}, grid: {stroke: colors.grid}, axisLabel: {fontSize: 12}}}
                         standalone={false}
                         label={"Edad (años)"}
            />
            <VictoryAxis dependentAxis crossAxis
                         style={{tickLabels: {fontSize: 10}, grid: {stroke: colors.grid}, axisLabel: {fontSize: 12}}}
                         standalone={false}
                         minDomain={minY}
                         maxDomain={maxY}
                         tickValues={Array(((maxY - minY) * 4 / yStep) + 1).fill(0).map((value, index) => (yStep / 4) * index + minY)}
                         tickFormat={value => value % yStep === 0 ? value : ''}
                         label={yLabel}
                         axisLabelComponent={<VictoryLabel dy={-10}/>}
            />
            <VictoryLine data={percentileData.percentile97} {...commonLineProps('97')}
                         style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>
            {percentileData.percentile90 && <VictoryLine data={percentileData.percentile90} {...commonLineProps('90')}
                                                         style={{data: {strokeWidth: .7}}}/>}
            {percentileData.percentile75 && <VictoryLine data={percentileData.percentile75} {...commonLineProps('75')}
                                                         style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>}
            <VictoryLine data={percentileData.percentile50} {...commonLineProps('50')}
                         style={{data: {strokeWidth: 1.5}}}/>
            {percentileData.percentile25 && <VictoryLine data={percentileData.percentile25} {...commonLineProps('25')}
                                                         style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>}
            {percentileData.percentile10 && <VictoryLine data={percentileData.percentile10} {...commonLineProps('10')}
                                                         style={{data: {strokeWidth: .7}}}/>}
            <VictoryLine data={percentileData.percentile3} {...commonLineProps('3')}
                         style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>
            <VictoryLine data={data} style={{data: {stroke: colors.stroke}}}/>
        </VictoryChart>
    )
}

export default GraphScreen;
