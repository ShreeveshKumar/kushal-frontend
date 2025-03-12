import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useUserrole } from "hooks/useUserrole";

const PaymentcontinueScreen = ({ route }) => {
    const { amount, type } = route.params;
    console.log(amount,type);
    
    const [userinfo, setuserinfo] = useState("");
    const { data, isLoading, error } = useUserrole();
    console.log(data);
    


    async function fetchUser() {
        try {
            const response = await axios.get("http://172.17.0.1:8000/api/get-info-owner", {
                headers: {
                    Authorization: `Bearer ${data.token}`,
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
    }, [data])

    return (
        <View style={styles.container}>
            <WebView source={{ uri: `http://172.17.0.1:8000/pay?amount=${amount}&type=${type}&name=${userinfo.username}&email=${userinfo.email}&phone=${userinfo.phone}` }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default PaymentcontinueScreen; 