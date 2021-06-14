import {Dimensions, StyleSheet} from "react-native";

export const windowHeight = Dimensions.get('window').height;
export const windowWidth = Dimensions.get('window').width;

export const isLandscape = () => {
    return windowWidth >= windowHeight;
};

export const mainStyles = {
    primary: '#649CCD',
    secondary: '#FAA645',
    darkBlue: '#133D8D',
    background: '#EBEBEB'
}

export const mainStylesheet = StyleSheet.create({
    container: {
        paddingVertical: windowHeight * .05,
        paddingHorizontal: windowWidth * .08
    }
})
