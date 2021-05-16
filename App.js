import React from 'react';
import {NativeRouter, Route} from "react-router-native";
import store from "./store";
import {Provider} from "react-redux";
import RegisterScreen from "./session/containers/Register";

export default function App() {

    return (
        <Provider store={store}>
            <NativeRouter>
                <Route path={'/'} component={RegisterScreen}/>
            </NativeRouter>
        </Provider>
    )
}
