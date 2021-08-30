import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import SideMenu from 'react-native-side-menu-updated'
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {TouchableOpacity} from "react-native-gesture-handler";
import {faBars, faBook, faChartBar, faEdit, faHeartbeat, faHome, faUser} from "@fortawesome/free-solid-svg-icons";
import {mainStyles} from "../../../mainStyles";
import {useHistory} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {connect} from "react-redux";
import actions from "../../../actions";
import ModalDropdown from 'react-native-modal-dropdown';
import {clearSelectedUser, getAllStoredTokens, removeCurrentToken} from "../../../utils/tokens";
import {getToken} from "../../../utils/http";

const AppFrame = ({children, getUserInfoFromToken, getUserInfo, allUsersInfo, userInfo, logout}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        async function fetchMyTokens() {
            const tokens = await getAllStoredTokens();
            tokens.forEach(token => {
                console.log( " este es un token", token)
                getUserInfoFromToken(token);
            });
        }
        fetchMyTokens();
        console.log(allUsersInfo)
    }, [])

    const history = useHistory();
    const location = useLocation();

    const logoutAction = () => {
        logout();
        removeCurrentToken();
        history.replace('/');
    }

    const menuOptions = [
        {text: "Inicio", icon: faHome, url: '/main/home', id: 'home'},
        {text: "Lecturas", icon: faBook, id: 'readings'},
        {text: "Inmunizaciones", icon: faHeartbeat, url: '/main/vaccine', id: 'vaccine'},
        {text: "Crecimiento", icon: faChartBar, url: '/main/graphScreen', id: 'anthropometricData'},
        {text: "Notas", icon: faEdit, id: 'notes'},
    ]

    const addAccount = () => {
        logout();
        clearSelectedUser();
        history.push('/');
    }

    const menu =
        <View style={styles.menu}>
            <View>
                {menuOptions.map(option => (
                    <View key={option.id} style={styles.menuOption}>
                        <TouchableHighlight style={styles.menuIconContainer}
                                            onPress={() => history.replace(option.url)}>
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
                {
                    allUsersInfo ?
                        <ModalDropdown options={allUsersInfo}>
                            <Text></Text>
                        </ModalDropdown> : null}
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
    allUsersInfo: state.session.allUsersInfo,
    userInfo: state.session.userInfo
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(actions.session.logout()),
    getUserInfo: () => dispatch(actions.session.getUserInfo.request()),
    getUserInfoFromToken: (token) => dispatch(actions.session.getUserInfoFromToken.request(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(AppFrame);


