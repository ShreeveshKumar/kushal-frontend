import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Animated } from 'react-native';

const Settings = () => {
    const navigation = useNavigation();
    const [openSections, setOpenSections] = useState({});
    const [fadeAnim] = useState(new Animated.Value(0)); // Fade animation for the whole screen
    const [isOwner, setisOwner] = useState();

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const handleUserLogout = async (navigation) => {
        try {
            await AsyncStorage.removeItem('token');
            navigation.replace('Login');
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };


    const handleRole = async () => {
        try {
            const result = await AsyncStorage.getItem("user");
            const userdata = JSON.parse(result);
            userdata.role === "washer" ? setisOwner(false) : setisOwner(true);


        } catch (err) {
            console.log(err.message);

        }
    }

    // Fade in animation on page load
    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
        handleRole();
    }, []);

    return (
        <Animated.ScrollView
            style={[tw`flex-1 p-4 `, { opacity: fadeAnim }]}  // Applying fade animation
            contentContainerStyle={tw`pb-4`}
            showsVerticalScrollIndicator={false}
        >
            <Text style={tw`text-xl font-bold text-center mb-6`}>My Account</Text>

            <View style={tw`mb-4`}>
                <TouchableOpacity
                    style={tw`flex flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md border border-gray-200`}
                    onPress={() => navigation.navigate("UserProfile")}
                >
                    <Text style={tw`text-lg font-medium`}>Edit Profile</Text>
                    <FontAwesome name="edit" size={20} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={tw`mb-4`}>
                <TouchableOpacity
                    style={tw`flex flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md border border-gray-200`}
                    onPress={() => toggleSection('feedback')}
                >
                    <Text style={tw`text-lg font-medium`}>Feedback & Q&A</Text>
                    <FontAwesome
                        name={openSections.feedback ? 'angle-up' : 'angle-down'}
                        size={24}
                        color="gray"
                    />
                </TouchableOpacity>
                {openSections.feedback && (
                    <Animated.View
                        style={[tw`bg-gray-50 p-4 rounded-lg mt-2`, { opacity: fadeAnim }]}
                    >
                        <TouchableOpacity onPress={() => navigation.navigate("FeedbackScreen")}>
                            <Text style={tw`text-base`}>Submit Feedback</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("FAQScreen")}>

                            <Text style={tw`text-base mt-2`}>Browse FAQs</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </View>

            <View style={tw`mb-4`}>
                <TouchableOpacity
                    style={tw`flex flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md border border-gray-200`}
                    onPress={() => toggleSection('payments')}
                >
                    <Text style={tw`text-lg font-medium`}>Payments & Refunds</Text>
                    <FontAwesome
                        name={openSections.payments ? 'angle-up' : 'angle-down'}
                        size={24}
                        color="gray"
                    />
                </TouchableOpacity>

                {openSections.payments && (
                    <Animated.View
                        style={[tw`bg-gray-50 p-4 rounded-lg mt-2`, { opacity: fadeAnim }]}
                    >
                        <TouchableOpacity onPress={() => navigation.navigate("balancescreen")}>
                            <Text style={tw`text-base`}>Payment History</Text>
                        </TouchableOpacity>
                        <Text style={tw`text-base mt-2`}>Request Refund</Text>
                    </Animated.View>
                )}
            </View>


            {
                isOwner ? (
                    <>




                        <View style={tw`mb-4`}>
                            <TouchableOpacity
                                style={tw`flex flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md border border-gray-200`}
                                onPress={() => toggleSection('manageCars')}
                            >
                                <Text style={tw`text-lg font-medium`}>Manage Cars</Text>
                                <FontAwesome
                                    name={openSections.manageCars ? 'angle-up' : 'angle-down'}
                                    size={24}
                                    color="gray"
                                />
                            </TouchableOpacity>
                            {openSections.manageCars && (
                                <Animated.View
                                    style={[tw`bg-gray-50 p-4 rounded-lg mt-2`, { opacity: fadeAnim }]}
                                >
                                    <TouchableOpacity onPress={() => navigation.navigate("Addcar")}>
                                        <Text style={tw`text-base`}>Add a Car</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate("Viewcar")}>
                                        <Text style={tw`text-base mt-2`}>View Car Details</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                            )}
                        </View>


                    </>
                ) : null
            };



            <View style={tw`mb-4`}>
                <TouchableOpacity
                    style={tw`flex flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md border border-gray-200`}
                    onPress={() => toggleSection('manage')}
                >
                    <Text style={tw`text-lg font-medium`}>Manage Account</Text>
                    <FontAwesome
                        name={openSections.manage ? 'angle-up' : 'angle-down'}
                        size={24}
                        color="gray"
                    />
                </TouchableOpacity>
                {openSections.manage && (
                    <Animated.View
                        style={[tw`bg-gray-50 p-4 rounded-lg mt-2`, { opacity: fadeAnim }]}
                    >
                        <TouchableOpacity onPress={() => navigation.navigate("DeleteAccount")}>
                            <Text style={tw`text-base`}>Delete Account</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("FAQScreen")}>

                            <Text style={tw`text-base mt-2`}>Deactivate Account</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </View>


            <View style={tw`w-full items-center align-middle `}>
                <TouchableOpacity
                    style={tw`flex flex-row gap-3 align-middle items-center `}
                    onPress={() => handleUserLogout(navigation)}
                >
                    <FontAwesome5 name="door-open" size={24} color="black" />
                    <Text style={tw`text-lg font-medium`}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </Animated.ScrollView>
    );
};

export default Settings;
