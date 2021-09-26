import {View} from "react-native";

const Table = ({title, accessor, data, noZScore}) => {
    const headers = noZScore ? ["Fecha", title] : ["Fecha", title, "Z-Score"];
    const sortedData = data.map(row => ({
        ...row,
        timeRecorded: new Date(row.timeRecorded)
    })).sort((a, b) => a.timeRecorded - b.timeRecorded);

    return (
        <View>
            {/*{sortedData.length > 0 ? */}

        </View>
    )
}
export default Table;
