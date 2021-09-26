import React from 'react';
import {NativeRouter, Route, Switch} from "react-router-native";
import store from "./store";
import {Provider} from "react-redux";
import RegisterScreen from "./session/containers/Register";
import MyStatusBar from "./common/components/status-bar/StatusBar";
import LoginScreen from "./session/containers/Login";
import PrivateRoute from "./security/PrivateRoute";
import AppFrame from "./common/components/app-frame/AppFrame";
import VaccineScreen from "./vaccines/containers/Vaccine";
import VaccineInformation from "./vaccines/containers/VaccineInformation";
import GraphScreen from "./graph/containers/Graph";
import HomeScreen from "./home/containers/Home";
import ReadingsScreen from "./readings/containers/ReadingsScreen";
import ArticleScreen from "./readings/containers/ArticleScreen";
import NotesScreen from "./notes/containers/NotesScreen";
import Note from "./notes/containers/Note";
import RelationshipScreen from "./relation/containers/RelationshipScreen";

export default function App() {
    // console.disableYellowBox = true;
    return (
        <Provider store={store}>
            <MyStatusBar/>
            <NativeRouter>
                <Switch>
                    <Route exact path={'/'} component={LoginScreen}/>
                    <Route exact path={'/register'} component={RegisterScreen}/>
                    <PrivateRoute path='/main' component={({match: {url}}) => ([
                        <AppFrame key={'app-frame'}>
                            <Switch style={{width: '100%', height: '100%'}}>
                                <PrivateRoute key={'home'} exact path={`${url}/home`} component={HomeScreen}/>
                                <PrivateRoute key={'graphScreen'} exact path={`${url}/graphScreen`}
                                              component={GraphScreen}/>
                                <PrivateRoute key={'vaccineScreen'} exact path={`${url}/vaccine`} component={VaccineScreen}/>
                                <PrivateRoute key={'readingsScreen'} exact path={`${url}/readings`} component={ReadingsScreen}/>
                                <PrivateRoute key={'specificVaccineDataScreen'} exact path={`${url}/vaccine/info`} component={VaccineInformation}/>
                                <PrivateRoute key={'notesScreen'} exact path={`${url}/notes`} component={NotesScreen}/>
                                <PrivateRoute key={'noteScreen'} path={`${url}/notes/`} component={Note}/>
                                <PrivateRoute key={'article'} path={`${url}/readings/article/`} component={ArticleScreen} />
                                <PrivateRoute key={'relationship'} path={`${url}/relationship`} component={RelationshipScreen} />
                            </Switch>
                        </AppFrame>
                    ])}/>
                </Switch>
            </NativeRouter>
        </Provider>
    )
}
