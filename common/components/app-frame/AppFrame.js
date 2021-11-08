import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableHighlight, View, Modal} from "react-native";
import SideMenu from 'react-native-side-menu-updated'
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {TouchableOpacity} from "react-native-gesture-handler";
import {
    faBars,
    faBook,
    faChartBar,
    faEdit,
    faHeartbeat,
    faHome,
    faUser,
    faAddressBook,
    faBell
} from "@fortawesome/free-solid-svg-icons";
import {mainStyles} from "../../../mainStyles";
import {useHistory} from "react-router-dom";
import {connect} from "react-redux";
import actions from "../../../actions";
import {
    clearSelectedUser,
    deleteAll,
    getAllStoredTokens,
    removeCurrentToken,
    setSelectedToken
} from "../../../utils/tokens";

const AppFrame = ({children, getUserInfoFromToken, getUserInfo, allUsersInfo, userInfo, logout}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getAllStoredTokens().then(tokensPromise => {
            Promise.all(tokensPromise).then(tokens => {
                tokens.map(token => {
                    getUserInfoFromToken(token);
                });
            })
        })
        if (!userInfo) getUserInfo();
    }, [userInfo])

    const history = useHistory();


    const changeModalVisibility = (bool) => {
        setModalVisible(bool)
    }
    const logoutAction = async () => {
        logout();
        await removeCurrentToken();
        await deleteAll();
        changeModalVisibility(false);
        setMenuOpen(false)
        history.replace('/');
    }

    const menuOptions = [
        {text: "Inicio", icon: faHome, url:'/main/home', id: 'home'},
        {text: "Lecturas", icon: faBook, url: '/main/readings', id:'readings'},
        {text: "Inmunizaciones", icon: faHeartbeat, url:'/main/vaccine', id:'vaccine'},
        {text: "Crecimiento", icon: faChartBar,url:'/main/graphScreen', id:'anthropometricData'},
        {text: "Notas", icon: faEdit, url:'/main/notes', id:'notes' },
        {text: "Vincular pediatra", icon: faAddressBook, url:'/main/relationship', id:'peditrician' },
        {text: "Notificaciones", icon: faBell, url:'/main/notifications', id:'notification' },
        {text: "Perfil", icon: faUser, url:'/main/prenatalProfile', id:'prenatalProfile' },
    ]

    const addAccount = async () => {
        logout();
        await clearSelectedUser();
        history.push('/');
    }

    const changeAccount = async (token) => {
        await setSelectedToken(token, logout);
        changeModalVisibility(false);
        setMenuOpen(false)
        history.replace('/main/home');
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
                        <Text style={styles.menuText} onPress={() => {
                            history.replace(option.url);
                            setMenuOpen(false)}}>{option.text}</Text>
                    </View>
                ))}
            </View>
            <View>
                <TouchableOpacity style={[styles.menuOption, styles.profileOption]}
                                  onPress={() => changeModalVisibility(!isModalVisible)}>
                    <TouchableHighlight style={styles.menuIconContainer}>
                        <FontAwesomeIcon icon={faUser} style={styles.menuIcon} size={20}/>
                    </TouchableHighlight>
                    <Text style={styles.menuText}>{userInfo?.firstName} {userInfo?.lastName}</Text>
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    animationType='fade'
                    visible={isModalVisible}
                    nRequestClose={() => changeModalVisibility(false)}
                >
                    <View style={styles.modal}>
                        {(allUsersInfo !== undefined && allUsersInfo[0] !== undefined) ? Object.keys(allUsersInfo).map(u =>
                            <TouchableOpacity  key={u} onPress={() => changeAccount(allUsersInfo[u].token)}>
                                <Text style={[styles.menuText, styles.dropdownText]}>{allUsersInfo[u]?.userInfo?.firstName} {allUsersInfo[u]?.userInfo?.lastName}</Text>
                            </TouchableOpacity>
                        ) : null}
                        <TouchableOpacity onPress={addAccount}>
                            <Text style={[styles.menuText, styles.dropdownText]}>Agregar Cuenta</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={logoutAction}>
                            <Text style={[styles.menuText, styles.dropdownText]}>Cerrar sesion</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
        marginTop: 20,
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
        color: '#FFF',
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
    },
    modal: {
        backgroundColor: mainStyles.primary,
        position: "absolute",
        bottom: 70,
        left: 30,
        alignItems: 'center',
        borderRadius: 5,
        padding: 5
    },
    dropdownText: {
        padding: 5,
        textAlign: 'left'
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


