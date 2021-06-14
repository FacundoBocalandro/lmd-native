import React from 'react';
import {NativeRouter, Route, Switch} from "react-router-native";
import store from "./store";
import {Provider} from "react-redux";
import RegisterScreen from "./session/containers/Register";
import MyStatusBar from "./common/components/status-bar/StatusBar";
import LoginScreen from "./session/containers/Login";
import PrivateRoute from "./security/PrivateRoute";
import AppFrame from "./common/components/app-frame/AppFrame";
import GraphScreen from "./graph/containers/Graph";
import HomeScreen from "./home/containers/Home";

export default function App() {
    return (
        <Provider store={store}>
            <MyStatusBar/>
            <NativeRouter>
                <Switch>
                    <Route exact path={'/'} component={LoginScreen}/>
                    <Route exact path={'/register'} component={RegisterScreen}/>
                    <PrivateRoute path='/main' component={({match: {url}}) => ([
                        <Switch>
                            <AppFrame key={'app-frame'}>
                                <PrivateRoute key={'home'} exact path={`${url}/home`} component={HomeScreen}/>
                                <PrivateRoute key={'graphScreen'} exact path={`${url}/graphScreen`} component={GraphScreen}/>
                            </AppFrame>
                        </Switch>
                    ])}/>
                </Switch>
            </NativeRouter>
        </Provider>
    )
}
