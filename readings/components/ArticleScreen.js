import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native"
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {mainStyles} from "../../mainStyles";

const ArticleScreen = ({article}) => {
    const history = useHistory();

    useEffect(() => {

    }, [article])

    return (
        <View style={{marginBottom: 110}}>
            <TouchableOpacity onPress={() => history.goBack()} style={styles.backButton}>
                <FontAwesomeIcon icon={faArrowLeft} size={25} color={'grey'}/>
            </TouchableOpacity>
            {
                article ?
                    <ScrollView>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Lecturas recomendadas</Text>
                        </View>
                        <View style={styles.categoryContainer}>
                            <Text style={styles.categoryText}>{article.category} > {article.title}</Text>
                        </View>
                        <ScrollView>
                            <Text style={styles.info}> {article.body} {article.body} </Text>
                        </ScrollView>
                    </ScrollView> : <Text>{JSON.stringify(article)}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 23,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    titleContainer: {
        alignSelf: 'center',
        width: '95%',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10,
        backgroundColor: mainStyles.darkBlue,
        padding: 14,
        borderRadius: 10
    },
    categoryText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 21,
        textAlign: 'center',
    },
    categoriesContainer: {
        width: '100%',
        height: '80%'
    },
    categoryContainer: {
        alignSelf: 'center',
        width: '95%',
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: mainStyles.primary,
        padding: 12,
        borderRadius: 10,
    },
    info: {
        color: 'black',
        fontSize: 20,
        width: '95%',
        marginBottom: 30,
        marginHorizontal: 20
    },
})

export default ArticleScreen;
