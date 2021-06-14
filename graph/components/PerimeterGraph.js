import React, {useEffect} from "react";

import GenericGraph from "./GenericGraph";
import {View} from "react-native";
import DelayedRendering from "../../common/components/delayed-rendering/DelayedRendering";

const data = Array(36).fill().map((value, index) => ({x: (19 / 228) * index + 8, y: 43 + 0.15 * index}))

const PerimeterGraph =  ({getAveragePerimeterData, averagePerimeterData, getUserPerimeterHistory, userPerimeterHistory})=> {

        useEffect(() => {
        if (!averagePerimeterData) getAveragePerimeterData();
        getUserPerimeterHistory();
    }, [])
    return (
        <DelayedRendering>
            {averagePerimeterData ?
                <GenericGraph percentileData={averagePerimeterData}
                              maxY={60}
                              minY={28}
                              yStep={2}
                              yLabel={"Perímetro Cefálico (cm)"}
                              data={data}
                              colors={{grid: '#649CCD', stroke: 'red'}}/> : null
            }
        </DelayedRendering>
    )
}

export default PerimeterGraph;
