import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    ImageBackground,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    LogBox,
    ActivityIndicator
} from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
// import { useFonts } from "expo-font";
import Banner from '../../../components/Banner/Banner';
import Footer from '../../../components/Footer/Footer';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import StarBanner from '../../../components/Ratings/Rating';
import AntDesign from '@expo/vector-icons/AntDesign';
import RatingComponent from '../../../components/Ratings/Rating';
import NavigateButton from '../../../components/Button/NavigateHomeScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckBox } from 'react-native-elements';
import ToggleSwitch from 'toggle-switch-react-native'


function CustomerHomeScreen() {
    const navigation = useNavigation();
    const [isOwner, setisOwner] = useState(false);
    const [isratebox, setisratebox] = useState(false);
    const [isaccept, setisaccept] = useState(true);


    const pendingTasks = [
        {
            id: "1",
            name: "Car Wash",
            donetill: "Done till 10:00 AM",
            task: "Wash and clean car exterior and interior",
        },
        {
            id: "2",
            name: "Oil Change",
            donetill: "Done till 1:30 PM",
            task: "Replace engine oil and filter",
        },
        {
            id: "3",
            name: "Tire Check",
            donetill: "Done till 4:00 PM",
            task: "Inspect and inflate tires to proper pressure",
        },
        {
            id: "4",
            name: "Battery Maintenance",
            donetill: "Done till 6:00 PM",
            task: "Check and clean battery terminals",
        },
    ];

    const completedTasks = [
        {
            id: "5",
            name: "Battery Maintenance",
            donetill: "Done till 6:00 PM",
            task: "Check and clean battery terminals",
        },
        {
            id: "6",
            name: "Battery Maintenance",
            donetill: "Done till 6:00 PM",
            task: "Check and clean battery terminals",
        },
    ];



    const renderTask = ({ item }) => (
        <View style={tw`p-4 bg-gray-100 rounded-xl mr-4 shadow-md`}>
            <Text style={[tw`text-black font-bold text-lg`]}>{item.name}</Text>
            <Text style={tw`text-black`}>{item.task}</Text>
            <Text style={tw`text-gray-600`}>{item.donetill}</Text>
        </View>
    );


    useEffect(() => {
        handleUser();
    }, [])


    const handleUser = async () => {
        try {
            const result = await AsyncStorage.getItem("user");
            const userdata = JSON.parse(result);
            console.log(userdata);
            console.log(userdata.role);
            if (userdata.role === 'washer') {
                setisOwner(false);
            } else {
                setisOwner(true);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    const setRole = async () => {
        try {
            const key = 'role';
            await AsyncStorage.setItem(key, 'washer');
            const storedRole = await AsyncStorage.getItem(key);
            console.log(storedRole);
            // setisOwner(false);
        } catch (error) {
            console.error('Error setting or retrieving the role:', error);
        }
    };


    const handleAccept = () => {
        try {

            setisaccept(prev => {
                console.log(prev);
                return !prev;
            })

        } catch (err) {
            console.log(err.message);
        }
    }




    useEffect(() => {
        setRole();
    }, [])


    return (
        isOwner ? (
            <>
                <SafeAreaView>
                    <ActivityIndicator />
                </SafeAreaView>
            </>
        ) : (
            <>
                <SafeAreaView style={tw`flex-1 `}>

                    <KeyboardAvoidingView
                        style={tw`flex bg-white`}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >

                        <ScrollView contentContainerStyle={tw` flex-grow`} showsVerticalScrollIndicator={false}>
                            <View style={tw`flex flex-row justify-between ml-5 mt-15`}>
                                <Text style={tw`text-3xl font-semibold`}>Welcome</Text>


                                <View style={tw`flex flex-row `}>
                                    <TouchableOpacity onPress={() => navigation.navigate("Tips")}>

                                        <AntDesign name="pushpino" size={24} color="black" />
                                    </TouchableOpacity>


                                    <TouchableOpacity onPress={() => navigation.navigate("Notification")}>

                                        <Ionicons name="notifications" size={24} color="black" style={tw`mx-5 `} />
                                    </TouchableOpacity>
                                </View>

                            </View>


                            <View style={tw`flex flex-row align-middle justify-center bg-slate-200 p-5 mx-5 my-3 rounded-xl`}>
                                <Text style={tw`bold text-sm`}>Continue accepting orders ?</Text>

                                <ToggleSwitch
                                    isOn={isaccept}
                                    onColor="blue"
                                    offColor="red"
                                    label={isaccept ? "On" : "Off"}
                                    labelStyle={{ color: "black", fontWeight: "900" }}
                                    size="large"
                                    onToggle={() => handleAccept()}
                                />

                            </View>


                            <ImageBackground
                                source={{ uri: "https://cdni.iconscout.com/illustration/premium/thumb/taxi-service-illustration-download-in-svg-png-gif-file-formats--car-booking-application-book-cab-travel-pack-holidays-illustrations-9530586.png" }}
                                resizeMode="cover"
                                style={tw`w-full h-64`}
                            />
                            {
                                isOwner ? (
                                    <>
                                        <NavigateButton text="Add your car wash here" page="WashForm" />

                                    </>) : (
                                    <>
                                        <NavigateButton text="See your schedule today" page="ScheduleCard" />

                                    </>
                                )

                            }


                            <View style={tw`p-5`}>
                                <Text style={[tw`text-black text-xl mb-3`]}>Scheduled Tasks</Text>
                                <FlatList
                                    data={pendingTasks}
                                    renderItem={renderTask}
                                    keyExtractor={(item) => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    nestedScrollEnabled={true}
                                />
                            </View>


                            <View style={tw`w-full my-4 overflow-hidden `}>
                                <Banner
                                    backgroundUri="https://www.shutterstock.com/image-vector/car-cartoon-banner-260nw-1312346801.jpg"
                                    heading=""
                                    subHeading=""
                                />
                            </View>


                            <View style={tw`p-5`}>
                                <Text style={[tw`text-black text-xl mb-3`]}>Completed Tasks</Text>
                                <FlatList
                                    data={completedTasks}
                                    renderItem={renderTask}
                                    keyExtractor={(item) => item.id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    nestedScrollEnabled={true}
                                />
                            </View>

                            <RatingComponent />
                            <Footer backgroundImageUri="https://img.pikbest.com/ai/illus_our/20230427/59f10732ce81427c6ecd242c2eed0b0f.jpg" heading="We are with you in every moment " description="Contact now" />
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </>
        )
    );
};

export default CustomerHomeScreen;