import React from "react";

import GenericGraph from "./GenericGraph";

const percentileData = {
    percentile97: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 50 + 0.59 * index})),
    percentile90: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 50 + 0.57 * index})),
    percentile75: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 50 + 0.55 * index})),
    percentile50: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 50 + 0.53 * index})),
    percentile25: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 50 + 0.51 * index})),
    percentile10: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 50 + 0.49 * index})),
    percentile3: Array(229).fill().map((value, index) => ({x: (19 / 228) * index, y: 50 + 0.47 * index})),
}

const data = Array(36).fill().map((value, index) => ({x: (19 / 228) * index + 8, y: 30 + 0.3 * index ^ 2}))

const HeightGraph = () => {
    return (
            <GenericGraph percentileData={percentileData}
                          maxY={85}
                          yStep={5}
                          yLabel={"Peso (kg)"}
                          data={data}
                          colors={{grid: '#649CCD', stroke: 'red'}}/>

    )
}

export default HeightGraph;
