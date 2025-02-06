import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import CreditCardUI from '../../../components/Creditcard/Creditcard';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import handleConfig from '../../../config/razorpay.config';


// const response = await fetch('https://your-backend.com/create-order', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ amount: 500, currency: 'INR' })
// });

const BalanceScreen = () => {


    const getuserinfo = async () => {
        try {
            const userresult = await AsyncStorage.getItem("user");
            const userdata = JSON.parse(userresult);
            const response = await axios.get("http://172.17.0.1:8000/api/profile", {
                headers: {
                    'Authorization': `Bearer ${userdata.token}`,
                }
            })
            const userInfo = response.data;
            console.log(userInfo);

            // const 
            // console.log(userobject);

            const thispayment = handleConfig({ amount: 100, userinfo: { email: userInfo.email, contact: userInfo.username, name: userInfo.username } });
            console.log(thispayment);

            RazorpayCheckout.open(thispayment)
                .then((data) => {
                    console.log(data);

                    console.log(`Payment Success: ${data.razorpay_payment_id}`);
                    alert(`Payment Successful! Payment ID: ${data.razorpay_payment_id}`);
                })
                .catch((error) => {
                    console.log(error);

                    console.log(`Payment Error: ${error.code} | ${error.description}`);
                    alert(`Payment Failed: ${error.description}`);
                });

        } catch (err) {
            console.log(err.message);
        }
    }


    // useEffect(() => {
    //     getuserinfo();
    // }, [])


    return (
        <SafeAreaView>
            <View style={tw` justify-center items-center  `}>
                <CreditCardUI />
            </View>


            <View style={tw`bg-blue-300 mt-2`}>
                <TouchableOpacity style={tw``} onPress={getuserinfo}>

                    <Text style={tw`text-center `}>Hello </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default BalanceScreen;