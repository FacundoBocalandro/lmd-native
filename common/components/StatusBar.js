import React from 'react';
import {Platform, StyleSheet, View} from "react-native";

const StatusBar = () => {
    return (
        <View style={styles.statusBar}/>
    )
}

const styles = StyleSheet.create({
    statusBar: {
        height: (Platform.OS === 'ios') ? 18 : 0,
        backgroundColor: "white",
    }
})

export default StatusBar;
