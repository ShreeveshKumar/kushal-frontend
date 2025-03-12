import * as SecureStore from 'expo-secure-store';

const getUserRole = async () => {
    try {
        const data = await SecureStore.getItemAsync("user");
        console.log("this is the data", data);
        if (!data) {
            return null;
        }
        return JSON.parse(data);
    } catch (error) {
        console.log("this is the error", error.message);
        return null;
    }
};

export default getUserRole;
