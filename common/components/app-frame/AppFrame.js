import React, {useState} from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import SideMenu from 'react-native-side-menu-updated'
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {TouchableOpacity} from "react-native-gesture-handler";
import {faBars, faBook, faChartBar, faEdit, faHeartbeat, faHome} from "@fortawesome/free-solid-svg-icons";
import {mainStyles} from "../../../mainStyles";
import {useHistory} from "react-router-dom";

const AppFrame = ({children}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const history = useHistory();

    const menuOptions = [
        {text: "Inicio", icon: faHome, url:'/main/home', id: 'home'},
        {text: "Lecturas", icon: faBook, id:'readings'},
        {text: "Inmunizaciones", icon: faHeartbeat, id:'vaccine'},
        {text: "Crecimiento", icon: faChartBar,url:'/main/graphScreen', id:'anthropometricData'},
        {text: "Notas", icon: faEdit, id:'notes' },
    ]

    const menu = (
        <View style={styles.menu}>
            {menuOptions.map(option => (
                <View key={option.id} style={styles.menuOption} >
                    <TouchableHighlight style={styles.menuIconContainer} onPress={() => history.replace(option.url)}>
                        <FontAwesomeIcon icon={option.icon} style={styles.menuIcon} size={20}/>
                    </TouchableHighlight>
                    <Text style={styles.menuText} onPress={() => history.replace(option.url)}>{option.text}</Text>
                </View>
            ))}
        </View>
    );

    return (
        <SideMenu menu={menu} isOpen={menuOpen} onChange={value => setMenuOpen(value)}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.barsIconContainer}>
                    <FontAwesomeIcon icon={faBars} size={25} style={styles.barsIcon}/>
                </TouchableOpacity>
                {children}
            </View>
        </SideMenu>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10
    },
    menu: {
        width: '100%',
        height: '100%',
        backgroundColor: mainStyles.darkBlue,
        paddingLeft: 10,
        paddingTop: 10
    },
    menuOption: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    menuIconContainer: {
        padding: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: mainStyles.primary
    },
    menuIcon: {
        color: '#FFF'
    },
    menuText: {
        marginLeft: 10,
        fontSize: 20,
        color: '#FFF'
    },
    barsIconContainer: {
        paddingRight: 10,
        paddingVertical: 5,
        backgroundColor: mainStyles.primary,
        width: 70,
        height: 50,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    barsIcon: {
        color: '#FFF'
    }
});


export default AppFrame
