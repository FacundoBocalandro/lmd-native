import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import SideMenu from 'react-native-side-menu-updated'
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {TouchableOpacity} from "react-native-gesture-handler";
import {faBars, faBook, faChartBar, faEdit, faHeartbeat, faHome, faUser} from "@fortawesome/free-solid-svg-icons";
import {mainStyles} from "../../../mainStyles";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import actions from "../../../actions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalDropdown from 'react-native-modal-dropdown';

const AppFrame = ({children, getUserInfoFromToken, allUsersInfo, logout}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const tokens = Object.keys(AsyncStorage.getAllKeys()).filter(key => key.startsWith('token-'));
        tokens.forEach(key => {
            getUserInfoFromToken(AsyncStorage.getItem(key));
        })
    }, [])

    const menuOptions = [
        {text: "Inicio", icon: faHome, url:'/main/home', id: 'home'},
        {text: "Lecturas", icon: faBook, id:'readings'},
        {text: "Inmunizaciones", icon: faHeartbeat, url:'/main/vaccine', id:'vaccine'},
        {text: "Crecimiento", icon: faChartBar,url:'/main/graphScreen', id:'anthropometricData'},
        {text: "Notas", icon: faEdit, id:'notes' },
    ]

    const logoutAction = () => {
        logout();

        //rearrange tokens to be in order
        const selectedUser = AsyncStorage.getItem('selected-user');
        const tokens = Object.keys(AsyncStorage.getAllKeys()).filter(key => key.startsWith('token-'));
        let lastToken = selectedUser;
        //get last token, which will be moved to the localstorage key where the removed token was.
        tokens.forEach(tokenString => {
            const tokenNumber = tokenString.split('-')[1]
            if (tokenNumber > lastToken) lastToken = parseFloat(tokenNumber);
        })

        AsyncStorage.removeItem(`token-${selectedUser}`);
        if (lastToken !== selectedUser) {
            AsyncStorage.setItem(`token-${selectedUser}`, AsyncStorage.getItem(`token-${lastToken}`))
            AsyncStorage.removeItem(`token-${lastToken}`)
        }

        AsyncStorage.removeItem('selected-user');

        history.replace('/');
    }

    const addAccount = () => {
        logout();
        history.push('/');
    }

    const setSelectedToken = (token) => {
        const tokens = Object.keys(AsyncStorage.getAllKeys()).filter(key => key.startsWith('token-'));
        tokens.forEach(tokenKey => {
            if (AsyncStorage.getItem(tokenKey) === token) {
                const tokenNumber = tokenKey.split('-')[1];
                if (tokenNumber !== AsyncStorage.getItem('selected-user')) {
                    logout();
                    AsyncStorage.setItem('selected-user', tokenNumber)
                }
            }
        })
    }

    const menu =
        <View style={styles.menu}>
            <View>
            {menuOptions.map(option => (
                <View key={option.id} style={styles.menuOption} >
                    <TouchableHighlight style={styles.menuIconContainer} onPress={() => history.replace(option.url)}>
                        <FontAwesomeIcon icon={option.icon} style={styles.menuIcon} size={20}/>
                    </TouchableHighlight>
                    <Text style={styles.menuText} onPress={() => history.replace(option.url)}>{option.text}</Text>
                </View>
            ))}
            </View>
            <View>
                <TouchableOpacity style={[styles.menuOption, styles.profileOption]}>
                    <TouchableHighlight style={styles.menuIconContainer}>
                        <FontAwesomeIcon icon={faUser} style={styles.menuIcon} size={20}/>
                    </TouchableHighlight>
                    {/*<Text style={styles.menuText}>{user.firstName} {user.lastName}</Text>*/}
                </TouchableOpacity>
                {/*<ModalDropdown options={allUsersInfo}>*/}
                {/*    <Text></Text>*/}
                {/*</ModalDropdown>*/}
            </View>
        </View>

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
        paddingTop: 10,
        justifyContent: 'space-between'
    },
    menuOption: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    profileOption: {
      marginBottom: 25
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


const mapStateToProps = state => ({
    allUsersInfo: state.session.allUsersInfo
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(actions.home.logout()),
    getUserInfoFromToken: (token) => dispatch(actions.home.getUserData.request(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppFrame);


