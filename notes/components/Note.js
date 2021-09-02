import React, {useCallback, useEffect, useState} from 'react';
import debounce from "lodash.debounce";
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
} from "react-native"
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {mainStyles} from "../../mainStyles";
import {useHistory} from "react-router-dom";

const Note = ({
                  note,
                  updateNoteTitle,
                  updateNoteBody,
              }) => {

    const history = useHistory();

    useEffect(() => {
    }, [])

    const debouncedTitleChange = useCallback(debounce((id, value) => {
        updateNoteTitle(id, value, true);
    }, 50), [note])

    const handleNoteTitleChange = (value) => {
        updateNoteTitle(note.id, value);
        debouncedTitleChange(note.id, value);
    }

    const debouncedBodyChange = useCallback(debounce((id, value) => {
        updateNoteBody(id, value, true);
    }, 50), [note])

    const handleNoteBodyChange = (id, value) => {
        updateNoteBody(id, value);
        debouncedBodyChange(id, value);
    }

    return (
        note ?
            <View>
                <TouchableOpacity onPress={() => history.goBack()} style={styles.backButton}>
                    <FontAwesomeIcon icon={faArrowLeft} size={25} color={'grey'}/>
                </TouchableOpacity>
                <View style={styles.mainContainer}>
                    <View style={styles.titleContainer}>
                        <TextInput style={styles.title}
                                   placeholder={"Escriba aquí el título..."}
                                   onChangeText={event => handleNoteTitleChange(event)}
                                   value={note.title}
                        />
                    </View>
                    <View style={styles.bodyContainer}>
                        <TextInput
                            multiline
                            placeholder={"Escriba aquí su consulta..."}
                            onChangeText={event => handleNoteBodyChange(note.id, event)}
                            value={note.body}
                            style={styles.bodyText}
                        />
                    </View>
                </View>
            </View> :
            null
    )
}

const styles = StyleSheet.create({
    backButton: {
        margin: 10,
        marginBottom: 0
    },
    mainContainer: {
        alignItems: 'center',
        width: '100%'
    },
    titleContainer: {
        backgroundColor: mainStyles.lightGrey,
        width: '90%',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    bodyContainer: {
        backgroundColor: mainStyles.lightGrey,
        width: '90%',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        height: '85%',
    },
    bodyText: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        fontSize: 18,
    }
})

export default Note
