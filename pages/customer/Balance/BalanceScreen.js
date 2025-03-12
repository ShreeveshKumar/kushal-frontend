import { View, Text, TouchableOpacity, ScrollView,Image } from 'react-native';
import React from 'react';
import CreditCardUI from '../../../components/Creditcard/Creditcard';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';


const RenderButton = () =>{
    return(
        <View style={tw`flex flex-row mx-10 align-middle items-center `}>
            <View style={tw`flex rounded-full h-10 `} >
               <Image source={{uri:"https://cdn-icons-png.flaticon.com/128/3772/3772736.png"}} width={40} height={40}/>
            </View>

            <View style={tw`border-t-2 border-l-rounded border-black w-18`}>
                <Text style={tw`text-center `}>Count</Text>
            </View>

            <View style={tw`flex rounded-full h-10  border-2 border-slate-300`} >
               <Image source={{uri:"https://cdn-icons-png.flaticon.com/128/3772/3772736.png"}} width={40} height={40}/>
            </View>
        </View>
    )
}

const BalanceScreen = () => {
    const navigation = useNavigation();

    const handleProceedToPayment = (amount, type) => {
        console.log("this is going", amount, type);
        navigation.navigate("Paymentcontinue", { amount, type });
    };

    return (
        <SafeAreaView>
            <ScrollView>
                   <RenderButton />
                <View style={tw`justify-center items-center`}>
                    <CreditCardUI />
                </View>

                <View style={tw`m-5`}>
                    <Text style={tw`text-3xl font-semibold`}>Recharge</Text>

                    <View style={tw`flex flex-row justify-around mb-2`}>
                        <TouchableOpacity
                            style={tw`bg-black text-white p-4 rounded-lg`}
                            onPress={() => handleProceedToPayment(250, "minisuv")}
                        >
                            <Text style={tw`text-white`}>Mini Suv 250</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={tw`bg-black text-white p-4 rounded-lg`}
                            onPress={() => handleProceedToPayment(700, "suv")}
                        >
                            <Text style={tw`text-white`}>Suv 700</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={tw`flex flex-row justify-around`}>
                        <TouchableOpacity
                            style={tw`bg-black text-white p-4 rounded-lg`}
                            onPress={() => handleProceedToPayment(600, "hatchback")}
                        >
                            <Text style={tw`text-white`}>Hatchback 600</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={tw`bg-black text-white p-4 rounded-lg`}
                            onPress={() => handleProceedToPayment(650, "sedan")}
                        >
                            <Text style={tw`text-white`}>Sedan 650</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <Text style={tw`text-3xl font-semibold`}>Recharge History</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default BalanceScreen;