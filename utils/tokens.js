import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Set selected token.
 * Used to change between users (multi user functionality).
 * @param token: JWT Token which will be selected to use (to fetch information from the backend)
 * @param logout: Redux function to delete stored information
 */
export const setSelectedToken = async (token, logout) => {
    const tokens = Object.keys(AsyncStorage.getAllKeys()).filter(key => key.startsWith('token-'));
    await tokens.forEach(tokenKey => {
        if ( AsyncStorage.getItem(tokenKey) === token) {
            const tokenNumber = tokenKey.split('-')[1];
            if (tokenNumber !== AsyncStorage.getItem('selected-user')) {
                logout();
                AsyncStorage.getItem('selected-user', tokenNumber)
                AsyncStorage.location.reload()
            }
        }
    })
}

/**
 * Clear selected user. Doesn't delete any stored token, but clears selected user
 */
export const clearSelectedUser = () => {
    AsyncStorage.removeItem('selected-user');
}

/**
 * Get all tokens from users that are logged in
 * @returns {string[]}: Array of stored tokens
 */
export const getAllStoredTokens = () => {
    const keys = getAllTokenKeys();
    return keys.map(key => AsyncStorage.getItem(key));
}

/**
 * Get token keys from localstorage.
 * Token keys have the format token-x, where x is the unique number that identifies the token.
 * @returns {string[]}: Array of keys.
 */
export const getAllTokenKeys = () => {
    return Object.keys(AsyncStorage.getAllKeys()).filter(key => key.startsWith('token-'));
}

/**
 * Save token in the last position and set as selected
 * @param token: JWT token
 */
export const saveNewToken = (token) => {
    const tokenKeys = getAllTokenKeys();
    // Start as 0. If there is no stored token, will remain as 0
    let lastToken = 0;
    tokenKeys.forEach(tokenKey => {
        // token keys have the format token-x
        const tokenNumber = tokenKey.split('-')[1]
        // look for the biggest token identifier
        if (tokenNumber > lastToken) lastToken = parseFloat(tokenNumber);
    })

    // store new token in last position
    AsyncStorage.setItem(`token-${lastToken + 1}`, token);

    // set token as selected
    AsyncStorage.setItem('selected-user', `${lastToken + 1}`);
}

/**
 * Removes current token and rearrange other stored tokens to keep order
 */
export const removeCurrentToken = () => {
    //rearrange tokens to be in order
    const selectedUser = AsyncStorage.getItem('selected-user');
    const tokenKeys = getAllTokenKeys();
    let lastToken = selectedUser;
    //get last token, which will be moved to the localstorage key where the removed token was.
    tokenKeys.forEach(tokenKey => {
        // token keys have the format token-x
        const tokenNumber = tokenKey.split('-')[1]

        // get biggest token key, which will be moved to the key where the current token was
        if (tokenNumber > lastToken) lastToken = parseFloat(tokenNumber);
    })

    // remove current token
    AsyncStorage.removeItem(`token-${selectedUser}`);
    if (lastToken !== selectedUser) {
        // in case the last token is different from the current one, move the last token to the current position
        AsyncStorage.setItem(`token-${selectedUser}`, AsyncStorage.getItem(`token-${lastToken}`))
        AsyncStorage.removeItem(`token-${lastToken}`)
    }

    clearSelectedUser();
}
