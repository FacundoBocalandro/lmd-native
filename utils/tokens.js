import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Set selected token.
 * Used to change between users (multi user functionality).
 * @param token: JWT Token which will be selected to use (to fetch information from the backend)
 * @param logout: Redux function to delete stored information
 */

// const history = useHistory();

export const setSelectedToken = async (token, logout) => {
    const tokens = await getAllTokenKeys();
    Promise.all(tokens).then(allTokens => {
            allTokens.forEach(async (tokenKey) => {
                const tokenFromKey = await AsyncStorage.getItem(tokenKey);
                if (tokenFromKey === token) {
                    const tokenNumber = tokenKey.split('-')[1];
                    if (tokenNumber !== await AsyncStorage.getItem('selected-user')) {
                        logout();
                        await AsyncStorage.setItem('selected-user', tokenNumber)
                    }
                }
            })
        }
    )
}

export const deleteAll = async () => {
    await AsyncStorage.clear()
}

/**
 * Clear selected user. Doesn't delete any stored token, but clears selected user
 */
export const clearSelectedUser = async () => {
    await AsyncStorage.removeItem('selected-user');
}

/**
 * Get all tokens from users that are logged in
 * @returns {string[]}: Array of stored tokens
 */
export const getAllStoredTokens = async () => {
    const keys = await getAllTokenKeys();
    return keys.map(async key => await AsyncStorage.getItem(key));
}


/**
 * Get token keys from localstorage.
 * Token keys have the format token-x, where x is the unique number that identifies the token.
 * @returns {string[]}: Array of keys.
 */
export const getAllTokenKeys = async () => {
    const keysToBeFiltered = await AsyncStorage.getAllKeys();
    return keysToBeFiltered.filter(key => key.startsWith('token-'));
}

/**
 * Save token in the last position and set as selected
 * @param token: JWT token
 */
export const saveNewToken = async (token) => {
    const tokenKeys = await getAllTokenKeys()
    // Start as 0. If there is no stored token, will remain as 0
    let lastToken = 0;
    tokenKeys.forEach(tokenKey => {
        // token keys have the format token-x
        const tokenNumber = tokenKey.split('-')[1]
        // look for the biggest token identifier
        if (tokenNumber > lastToken) lastToken = parseFloat(tokenNumber);
    })

    // store new token in last position
    await AsyncStorage.setItem(`token-${lastToken + 1}`, token);

    // set token as selected
    await AsyncStorage.setItem('selected-user', `${lastToken + 1}`);
}

/**
 * Removes current token and rearrange other stored tokens to keep order
 */
export const removeCurrentToken = async () => {
    //rearrange tokens to be in order
    const selectedUser = await AsyncStorage.getItem('selected-user');
    let lastToken = selectedUser;
    const tokenKeys = await getAllTokenKeys();
    //get last token, which will be moved to the localstorage key where the removed token was.
    tokenKeys.forEach(tokenKey => {
        // token keys have the format token-x
        const tokenNumber = tokenKey.split('-')[1]

        // get biggest token key, which will be moved to the key where the current token was
        if (tokenNumber > lastToken) lastToken = parseFloat(tokenNumber);
    })
    // remove current token
    await AsyncStorage.removeItem(`token-${selectedUser}`);
    if (lastToken !== selectedUser) {
        // in case the last token is different from the current one, move the last token to the current position
        await AsyncStorage.setItem(`token-${selectedUser}`, await AsyncStorage.getItem(`token-${lastToken}`))
        await AsyncStorage.removeItem(`token-${lastToken}`)
    }
    await clearSelectedUser();

}

export const getCurrentUserToken = async () => {
    const selectedUserTokenKey = await AsyncStorage.getItem('selected-user')
    const token = await AsyncStorage.getItem(`token-${selectedUserTokenKey}`);
    return token;
}

