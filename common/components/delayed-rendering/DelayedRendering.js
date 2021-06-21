import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faCircleNotch, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {View} from "react-native";
import {windowHeight} from "../../../mainStyles";

const DelayedRendering = ({timeout = 500, children}) => {
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setHidden(false)}, timeout);
    }, [timeout])

    return hidden ?
        <View/> : children;
}


const styles = {
    delayedRendering: {
        display: 'block',
        justifyContent: 'center',
    }
}

export default DelayedRendering;
