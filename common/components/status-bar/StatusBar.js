import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from "react-native";
import {mainStyles} from "../../../mainStyles";

const MyStatusBar = () => {
    return (
        <View style={styles.statusBar}>
            <SafeAreaView>
                <StatusBar translucent backgroundColor={mainStyles.darkBlue} barStyle="light-content"/>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    statusBar: {
        height: StatusBar.currentHeight,
        backgroundColor: mainStyles.darkBlue,
    }
})

export default MyStatusBar;
