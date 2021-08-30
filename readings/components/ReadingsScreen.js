import React, {useEffect, useState} from 'react';
import {
    ScrollView,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native"


import {useHistory} from "react-router-dom";
import {mainStyles} from "../../mainStyles";

const ReadingsScreen = ({getAllCategories, getAllReadingsForCategory, allCategories, categoryReadings, setArticleId}) => {

    useEffect(() => {
        if (!allCategories) getAllCategories();
    }, [])

    const [currentCategory, setCurrentCategory] = useState(false);

    const history = useHistory();

    const openArticle = (article)  => {
        setArticleId(article);
        history.push(`/main/readings/article/${article.id}`);
    }

    const getReadings = (categoryName) => {
        if (currentCategory !== categoryName) {
            getAllReadingsForCategory(categoryName);
            setCurrentCategory(categoryName);
        } else {
            setCurrentCategory(undefined);
        }
    }

    return (
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Lecturas recomendadas</Text>
            </View>
            <View style={styles.categoriesContainer}>
                <ScrollView>
                    {allCategories?.map(category => (
                        <View key={`category-${category.id}`} style={styles.categoryAndArticleContainer}>
                            <TouchableOpacity style={styles.categoryContainer}
                                              onPress={() => getReadings(category.name)}>
                                <Text style={styles.categoryText}>{category.name}</Text>
                            </TouchableOpacity>

                            {currentCategory === category.name ? categoryReadings?.map(article => (
                                <TouchableOpacity key={article.id} style={styles.articleContainer} onPress={() => openArticle(article)}>
                                    <Text style={styles.articleText}> {article.title}</Text>
                                </TouchableOpacity>)) : null}
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 23,
        textAlign: 'center',
    },
    titleContainer: {
        alignSelf: 'center',
        width: '80%',
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
        width: '80%',
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: mainStyles.primary,
        padding: 12,
        borderRadius: 10,
    },
    articleContainer: {
        alignSelf: 'center',
        width: '80%',
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: '#DDDDDD',
        padding: 10,
        borderRadius: 10,
    },
    articleText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    categoryAndArticleContainer: {
        marginBottom: 15
    }
})

export default ReadingsScreen;
