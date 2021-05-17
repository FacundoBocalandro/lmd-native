import React from 'react';
import {NativeRouter, Route} from "react-router-native";
import store from "./store";
import {Provider} from "react-redux";
import RegisterScreen from "./session/containers/Register";
import {Button, View} from "react-native";
import {useHistory} from "react-router-dom";

export default function App() {

    return (
        <Provider store={store}>
            <NativeRouter>
                <Route exact path={'/'} component={Login}/>
                <Route exact path={'/register'} component={RegisterScreen}/>
            </NativeRouter>
        </Provider>
    )
}

const Login = () => {
    const history = useHistory();
    return(
        <View>
            <Button title={"Register"} onPress={() => history.push('/register')}/>
        </View>
    )
}
