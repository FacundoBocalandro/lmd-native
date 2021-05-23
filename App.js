import React from 'react';
import {NativeRouter, Route} from "react-router-native";
import store from "./store";
import {Provider} from "react-redux";
import RegisterScreen from "./session/containers/Register";
import {Button, View} from "react-native";
import {useHistory} from "react-router-dom";
import StatusBar from "./common/components/StatusBar";
import {mainStylesheet} from "./mainStyles";

export default function App() {

    return (
        <Provider store={store}>
            <StatusBar/>
                <NativeRouter>
                    <Route exact path={'/'} component={Login}/>
                    <Route exact path={'/register'} component={RegisterScreen}/>
                </NativeRouter>
        </Provider>
    )
}

const Login = () => {

    const history = useHistory();
    return (
        <View style={{...mainStylesheet.container}}>
            <Button title={"Register"} onPress={() => history.push('/register')}/>
        </View>
    )
}
