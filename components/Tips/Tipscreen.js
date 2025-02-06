import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

const TipsScreen = () => {
    const [role, setRole] = useState(null);
    const [tips, setTips] = useState([]);

    const carTips = {
        washer: [
            "1. Use Two-Bucket Method – One for soapy water, one for rinsing the sponge to avoid spreading dirt.",
            "2. Start from the Top – Wash the car from top to bottom to prevent dirt from dripping onto clean areas.",
            "3. Use pH-Balanced Soap – Harsh detergents can damage car paint and wax.",
            "4. Dry with a Microfiber Towel – Prevents water spots and scratches.",
            "5. Check for Missed Spots – Inspect the car under good lighting to ensure a spotless finish."
        ],
        owner: [
            "1. Wash Your Car Every Two Weeks – Prevents buildup of dirt and grime that can damage the paint.",
            "2. Avoid Automated Car Washes with Brushes – They can leave swirl marks and scratches.",
            "3. Apply Wax Every 3-4 Months – Protects the paint and adds shine.",
            "4. Keep Windows and Mirrors Clean – Improves visibility and safety.",
            "5. Don’t Forget the Interior – Vacuuming and dashboard cleaning keep the car fresh and comfortable."
        ]
    };

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const userData = await AsyncStorage.getItem('user');
                if (userData) {
                    const parsedUser = JSON.parse(userData);
                    setRole(parsedUser.role);
                    setTips(parsedUser.role === 'washer' ? carTips.washer : carTips.owner);
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        };

        fetchUserRole();
    }, []);

    return (
        <SafeAreaView style={tw`p-4`}>
            <ScrollView contentContainerStyle={tw`p-4`}>
                <Text style={tw`text-2xl font-bold text-center mb-6`}>
                    {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Tips` : "Loading..."}
                </Text>
                {tips.map((tip, index) => (
                    <View key={index} style={tw`bg-gray-100 p-4 mb-4 rounded-lg`}>
                        <Text style={tw`text-lg text-gray-800`}>{tip}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default TipsScreen;
