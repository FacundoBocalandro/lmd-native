import React from 'react';
import {NativeRouter, Route} from "react-router-native";
import store from "./store";
import {Provider} from "react-redux";
import RegisterScreen from "./session/containers/Register";
import StatusBar from "./common/components/StatusBar";
import LoginScreen from "./session/containers/Login";
import HomeScreen from "./session/containers/Home";
import PrivateRoute from "./security/PrivateRoute";
import GraphScreen from "./session/containers/Graph";
import HeightGraph from "./session/components/graphs/HeightGraph";

export default function App() {
    return (
        <Provider store={store}>
            <StatusBar/>
                <NativeRouter>
                    <Route exact path={'/'} component={LoginScreen}/>
                    <Route exact path={'/register'} component={RegisterScreen}/>
                    <PrivateRoute exact path={'/home'} component={GraphScreen}/>
                </NativeRouter>
        </Provider>
    )
}
