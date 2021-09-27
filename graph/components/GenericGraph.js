import React, {useState} from 'react';
import {
    VictoryChart,
    VictoryAxis,
    VictoryLabel,
    VictoryLine,
    VictoryScatter,
    VictoryZoomContainer
} from "victory-native";
import {windowHeight, windowWidth, isLandscape, mainStyles} from "../../mainStyles";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";

const GenericGraph = ({percentileData, maxY, minY = 0, yStep, yLabel, data, colors, zoomOptions, selectedXRange}) => {
    const [xRange, setXRange] = useState(selectedXRange ?? {min: 0, max: 19})

    const maxYToDisplay = Math.max(getMaxY(data), maxY);
    const minYToDisplay = Math.min(getMinY(data), minY);

    const commonLineProps = (percentile) => {
        const lineData = percentileData[`percentile${percentile}`];

        return {
            labelComponent: <VictoryLabel style={{fontSize: 8, fontWeight: 'bold'}} dy={-3}/>,
            labels: ({datum}) => datum.x === lineData[lineData.length - 5].x ? percentile : ''
        }
    }

    return (
        <View>
            {zoomOptions && <View style={styles.tabContainer}>
                {zoomOptions.map(zoomOption =>
                    <TouchableOpacity
                        style={[styles.homeScreenTab, xRange.min === zoomOption.min && xRange.max === zoomOption.max ? styles.selected : '']}
                        onPress={() => setXRange(zoomOption)}
                    key={zoomOption.max}>
                        <Text  style={styles.homeScreenTabText}>{zoomOption.min} - {zoomOption.max}</Text>
                    </TouchableOpacity>)}
            </View>}
            <VictoryChart
                containerComponent={<VictoryZoomContainer zoomDomain={{x: [xRange.min, xRange.max], y: [minYToDisplay, maxYToDisplay]}}/>}
                width={isLandscape() ? (windowHeight * 0.9) : windowWidth}
                height={isLandscape() ? (windowWidth * 0.8) : (windowHeight * 0.8)}
                minDomain={{x: xRange.min, y: minYToDisplay}} maxDomain={{x: xRange.max, y: maxYToDisplay}}>
                <VictoryAxis crossAxis
                             minDomain={xRange.min}
                             maxDomain={xRange.max}
                             tickValues={Array(115).fill(0).map((value, index) => (19 / 114) * index)}
                             tickFormat={value => value % 1 === 0 ? value : ''}
                             style={{
                                 tickLabels: {fontSize: 10},
                                 grid: {stroke: colors.grid},
                                 axisLabel: {fontSize: 12}
                             }}
                             standalone={false}
                             label={"Edad (años)"}
                />
                <VictoryAxis dependentAxis crossAxis
                             style={{
                                 tickLabels: {fontSize: 10},
                                 grid: {stroke: colors.grid},
                                 axisLabel: {fontSize: 12}
                             }}
                             standalone={false}
                             minDomain={minYToDisplay}
                             maxDomain={maxYToDisplay}
                             tickValues={Array(((maxYToDisplay - minYToDisplay) * 4 / yStep) + 1).fill(0).map((value, index) => (yStep / 4) * index + minYToDisplay)}
                             tickFormat={value => value % yStep === 0 ? value : ''}
                             label={yLabel}
                             axisLabelComponent={<VictoryLabel dy={-10}/>}
                />
                <VictoryLine data={percentileData.percentile97} {...commonLineProps('97')}
                             style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>
                {percentileData.percentile90 &&
                <VictoryLine data={percentileData.percentile90} {...commonLineProps('90')}
                             style={{data: {strokeWidth: .7}}}/>}
                {percentileData.percentile75 &&
                <VictoryLine data={percentileData.percentile75} {...commonLineProps('75')}
                             style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>}
                <VictoryLine data={percentileData.percentile50} {...commonLineProps('50')}
                             style={{data: {strokeWidth: 1.5}}}/>
                {percentileData.percentile25 &&
                <VictoryLine data={percentileData.percentile25} {...commonLineProps('25')}
                             style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>}
                {percentileData.percentile10 &&
                <VictoryLine data={percentileData.percentile10} {...commonLineProps('10')}
                             style={{data: {strokeWidth: .7}}}/>}
                <VictoryLine data={percentileData.percentile3} {...commonLineProps('3')}
                             style={{data: {strokeWidth: .7, strokeDasharray: '3,3'}}}/>
                {data.length === 1 ? <VictoryScatter data={data} style={{data: {fill: colors.stroke}}}/> :
                    <VictoryLine data={data} style={{data: {stroke: colors.stroke}}}/>}
            </VictoryChart>
        </View>
    )
}

const getMaxY = (data) => {
    let maxY = 0;
    data.forEach(value => {
        if (value.y > maxY) maxY = value.y
    })
    return maxY;
}

const getMinY = (data) => {
    let minY = 0;
    data.forEach(value => {
        if (value.y < minY) minY = value.y
    })
    return minY;
}

export default GenericGraph;

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 25,
        marginTop: -60,
        marginLeft: 60
    },
    homeScreenTab: {
        textAlign: 'center',
        borderRadius: 30,
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainStyles.darkBlue,
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
        margin: 0
    },
    homeScreenTabText: {
        fontSize: 18,
        color: 'white'
    },
    selected: {
        backgroundColor: mainStyles.primary
    },
})
