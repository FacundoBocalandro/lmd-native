import {useHistory} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Switch} from 'react-native-switch';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {mainStyles, windowHeight, windowWidth} from "../../mainStyles";

const NotificationCenterScreen = ({}) => {
    const history = useHistory();

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={styles.container}>
            <Switch
                onValueChange={toggleSwitch}
                value={isEnabled}
                activeText={'Si'}
                inActiveText={'No'}
                backgroundActive={mainStyles.primary}
                backgroundInactive={mainStyles.darkGrey}
                switchBorderRadius={10}
                innerCircleStyle={{borderRadius: 10, borderColor: isEnabled ?  mainStyles.primary : mainStyles.darkGrey, margin: 0  }}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default NotificationCenterScreen;
