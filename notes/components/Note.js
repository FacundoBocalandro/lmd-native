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
                  updateNoteStatus,
              }) => {

    const history = useHistory();

    useEffect(() => {
        console.log("primer note del use effect", note)
    }, [])

    const debouncedTitleChange = useCallback(debounce((id, value) => {
        updateNoteTitle(id, value, true);
    }, 500), [note])

    const handleNoteTitleChange = (value) => {
        console.log(value);
        console.log(note);
        updateNoteTitle(note.id, value);
        debouncedTitleChange(note.id, value);
    }

    const debouncedBodyChange = useCallback(debounce((id, value) => {
        updateNoteBody(id, value, true);
    }, 500), [note])

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
                        >
                            {note.title}
                        </TextInput>
                    </View>
                    <View style={styles.bodyContainer}>
                        <TextInput placeholder={"Escriba aquí su consulta..."}
                                   onChangeText={event => handleNoteBodyChange(note.id, event)}
                        >
                            {note.body}
                        </TextInput>
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
        backgroundColor: mainStyles.grey,
        width: '90%',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    },
    title: {
        fontSize: 20,
    },
    bodyContainer: {
        backgroundColor: mainStyles.grey,
        width: '90%',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        height: '85%'
    }
})

export default Note
