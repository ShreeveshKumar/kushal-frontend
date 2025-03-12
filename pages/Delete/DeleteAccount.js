import React from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ToastAndroid } from 'react-native';
// import { useFonts } from 'expo-font';
import tw from "twrnc";
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserrole } from 'hooks/useUserrole';
// SplashScreen.preventAutoHideAsync();
import { useNavigation } from '@react-navigation/native';

const Checkbox = ({ text }) => {
    return (
        <View>
            <Text>{text}</Text>

        </View>
    )
}

const reasons = [
    {
        id: 0,
        reason: "I am no longer using my account "
    },
    {
        id: 1,
        reason: "The service is too expensive "
    },
    {
        id: 2,
        reason: "I want to change my phone number"
    },
    {
        id: 3,
        reason: "I didn't understand how to use"
    },
    {
        id: 4,
        reason: "Other"
    },
];


async function deleteUser(data) {
    const navigation = useNavigation();
    try {
        const response = await axios.post("http://", {
            headers: {
                'Authorization': `Bearer ${data.token}`,
                'Content-Type': 'application/json'
            }
        });
        const result = response.data;
        setTimeout(() => {
            ToastAndroid.show("Account scheduled for deletion and will be deleted in 15 working days", ToastAndroid.SHORT);
            navigation.navigate("Login");
        }, 3000);

    } catch (err) {
        console.error(err.message);
    }

}



const DeletePage = async () => {

    const { data, isloading, error } = useUserrole();
    console.log("we are getting", data);
    await deleteUser(data);





    // const [loaded, error] = useFonts({
    //     'Ubuntu-Regular': require('../../fonts/Ubuntu-Regular.ttf'),
    // });

    // if (!loaded) {
    //     return (
    //         <SafeAreaView style={tw`flex-1 justify-center items-center`}>
    //             <ActivityIndicator size="large" color="#0000ff" />
    //         </SafeAreaView>
    //     );
    // }

    return (
        <SafeAreaView>
            <View style={tw`flex justify-center place-content-center items-center align-middle `}>
                <Text style={[tw`font-bold  my-10 text-3xl bg-blue-200`, { fontFamily: "" }]}>
                    Delete Account
                </Text>
                <View>
                    {
                        reasons.map((item, index) => {
                            <Checkbox text={item.reason} />
                        })
                    }
                </View>


                <View style={tw`flex w-full my-10  `}>

                    <TouchableOpacity style={tw`bg-blue-800 rounded-full p-5 m-10 `} >
                        <Text style={tw`text-white text-center text-lg `}> Delete Account </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
}

export default DeletePage;
