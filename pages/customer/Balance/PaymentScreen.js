import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const PaymentcontinueScreen = ({ route }) => {
    const { amount } = route.params;
    const [userinfo, setuserinfo] = useState("");


    async function fetchUser() {
        try {

            const token = await AsyncStorage.getItem(("user"));
            const user = JSON.parse(token);
            const response = await axios.get("https://kushal-backend.onrender.com/api/get-info-owner", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const userinfo = response.data;
            console.log("Data is ", userinfo.data);

            setuserinfo(userinfo.data || {});
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <View style={styles.container}>
            <WebView source={{ uri: `https://kushal-backend.onrender.com/pay?amount=${amount}&name=${userinfo.username}&email=${userinfo.email}&phone=${userinfo.phone}` }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default PaymentcontinueScreen; 