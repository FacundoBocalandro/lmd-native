import React from 'react';
import {useHistory} from 'react-router-dom';
import {ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler'
import {mainStylesheet} from "../../mainStyles";
const HomeScreen = ({logout}) => {

    const history = useHistory();

    const logoutAction = () => {
        AsyncStorage.removeItem('token');
        logout();
        history.replace('/');
    }
    return (
        <View style={{...styles.container, ...mainStylesheet.container}}>
            <TouchableOpacity onPress={() => logoutAction()}>
                <Text>LOG OUT</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default HomeScreen;
