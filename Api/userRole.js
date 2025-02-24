import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserRole = async () => {
    try {
        const user = await AsyncStorage.getItem("user");
        const userInfo = JSON.parse(user);
        return userInfo;
    } catch (error) {
        console.log(error.message);
    }
}

export default getUserRole; 