import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import CreditCardUI from '../../../components/Creditcard/Creditcard';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const BalanceScreen = () => {
    const navigation = useNavigation();

    const handleProceedToPayment = (amount) => {
        console.log(amount);
        navigation.navigate("Paymentcontinue", { amount });
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={tw`justify-center items-center`}>
                    <CreditCardUI />
                </View>

                <View style={tw`m-5`}>
                    <Text style={tw`text-3xl font-semibold`}>Recharge</Text>

                    <View style={tw`flex flex-row justify-around mb-2`}>
                        <TouchableOpacity
                            style={tw`bg-black text-white p-4 rounded-lg`}
                            onPress={() => handleProceedToPayment(250)}
                        >
                            <Text style={tw`text-white`}>Mini Suv 250</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={tw`bg-black text-white p-4 rounded-lg`}
                            onPress={() => handleProceedToPayment(700)}
                        >
                            <Text style={tw`text-white`}>Suv 700</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={tw`flex flex-row justify-around`}>
                        <TouchableOpacity
                            style={tw`bg-black text-white p-4 rounded-lg`}
                            onPress={() => handleProceedToPayment(600)}
                        >
                            <Text style={tw`text-white`}>Hatchback 600</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={tw`bg-black text-white p-4 rounded-lg`}
                            onPress={() => handleProceedToPayment(650)}
                        >
                            <Text style={tw`text-white`}>Sedan 650</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <Text style={tw`text-3xl font-semibold`}>Recharge History</Text>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

export default BalanceScreen;