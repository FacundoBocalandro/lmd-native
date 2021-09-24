import React, {useCallback, useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from "react-native"

import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {mainStyles} from "../../mainStyles";
import {faPlusCircle, faSpinner, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import SearchInput from "../../common/components/search/SearchInput";
import {useHistory} from "react-router-dom";

const NotesScreen = ({
                         allNotes,
                         getAllNotes,
                         createNote,
                         deleteNote,
                         createNotePending,
                         setSelectedNote
                     }) => {
    const [searchFilter, setSearchFilter] = useState("");

    const history = useHistory();

    useEffect(() => {
        getAllNotes();
    }, [])

    const [modalVisible, setModalVisible] = useState(false);
    const [currentNoteId, setCurrentNoteId] = useState(undefined);

    const openModal = (noteId) => {
        console.log("abriendo modal")
        setCurrentNoteId(noteId);
        setModalVisible(true);
    }

    const closeModal = () => {
        setCurrentNoteId(undefined);
        setModalVisible(false);
    }

    const handleDeleteNote = (id) => {
        closeModal();
        deleteNote(id);
    }

    const createNewNote = () => {
        createNote(note => openNote(note))
    }

    const openNote = (note) => {
        setSelectedNote(note)
        history.push(`/main/notes/${note.id}`);
    }

    return (
        <View>
            {/*<SearchInput onChange={value => setSearchFilter(value)} value={searchFilter}/>*/}
            <View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Notas de consulta</Text>
                    <FontAwesomeIcon icon={faPlusCircle}
                                     size={25}
                                     color={'white'}
                                     onPress={() => createNewNote()}/>
                </View>
                <View style={styles.notesContainer}>
                    <ScrollView>
                        {createNotePending && <FontAwesomeIcon icon={faSpinner} spin size={30} color={'#133D8D'}/>}
                        {allNotes && allNotes
                            .filter(note => note.title.toLowerCase().includes(searchFilter.toLowerCase()))
                            .map(note => (
                                <View style={styles.noteContainer} key={note.id}>
                                    <TouchableOpacity style={styles.titleTextContainer} onPress={() => openNote(note)}>
                                        <Text style={styles.notesText}>{note.title}</Text>
                                    </TouchableOpacity>
                                    <FontAwesomeIcon icon={faTimesCircle} style={styles.deleteNoteIcon}
                                                     onPress={() => openModal(note.id)} size={25}/>
                                </View>
                            ))}

                    </ScrollView>
                </View>
                <Modal animationType="slide"
                       transparent={true}
                       visible={modalVisible}
                       onRequestClose={() => {
                           closeModal();
                       }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>¿Esta seguro que desea eliminar la nota?</Text>
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.cancelButton]}
                                    onPress={() => closeModal()}
                                >
                                    <Text style={styles.textStyle}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.cancelButton]}
                                    onPress={() => handleDeleteNote(currentNoteId)}
                                >
                                    <Text style={styles.textStyle}>Borrar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>

        </View>
    )
}

export default NotesScreen;

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 23,
        textAlign: 'center',
    },
    titleTextContainer: {
        width: '90%'
    },
    titleContainer: {
        alignSelf: 'center',
        width: '80%',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10,
        backgroundColor: mainStyles.darkBlue,
        padding: 14,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    notesText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 21,
        textAlign: 'center',
    },
    notesContainer: {
        width: '100%',
        height: '80%'
    },
    noteContainer: {
        alignSelf: 'center',
        width: '80%',
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: mainStyles.primary,
        padding: 12,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    deleteNoteIcon: {
        fontSize: 30,
        color: 'red'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalTitle: {
        textAlign: 'center',
        fontSize: 18,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    cancelButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 25,
        backgroundColor: mainStyles.primary,
        width: 160
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
})
