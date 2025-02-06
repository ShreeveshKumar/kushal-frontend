import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

const ScheduleCard = () => {
    const [data, setData] = useState([
        { id: '1', date: '2025-02-01', status: 'Completed' },
        { id: '2', date: '2025-02-02', status: 'Pending' },
        { id: '3', date: '2025-02-03', status: 'In Progress' },
        { id: '4', date: '2025-02-04', status: 'Completed' },
        { id: '5', date: '2025-02-05', status: 'Pending' },
    ]);

    const renderCard = (item) => {
        return (
            <View key={item.id} style={tw`bg-white p-4 mb-4 rounded-lg shadow-md w-full`}>
                <Text style={tw`text-lg font-semibold text-gray-800`}>Date: {item.date}</Text>
                <Text style={tw`text-base text-gray-600`}>Status: {item.status}</Text>
                <Text style={tw`text-sm text-gray-500`}>ID: {item.id}</Text>
                <TouchableOpacity
                    style={tw`mt-2 p-2 bg-blue-500 rounded-lg w-24` }
                    onPress={() => console.log(`Viewing details for ID: ${item.id}`)}
                >
                    <Text style={tw`text-white text-center `}>View Details</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={tw`p-4`}>
            <ScrollView contentContainerStyle={tw`space-y-4`}>
                <Text style={tw`text-2xl font-bold text-center mb-6`}>Card Screen</Text>
                <View style={tw`flex-row flex-wrap justify-between`}>
                    {data.map(renderCard)}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ScheduleCard;
