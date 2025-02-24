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
import { useScheduleData } from 'hooks/useHomedata';
import { useUserrole } from 'hooks/useUserrole';

function CustomerHomeScreen() {
    const navigation = useNavigation();
    const [isOwner, setisOwner] = useState(false);
    const [isaccept, setisaccept] = useState(true);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const { data: scheduleData, isLoading: isScheduleLoading, error: scheduleError } = useScheduleData();
    const { data: userRoleData, isLoading: isUserRoleLoading, error: userRoleError } = useUserrole();

    useEffect(() => {
        if (userRoleData?.role === "washer") {
            setisOwner(false);
        } else {
            setisOwner(true);
        }
    }, [userRoleData])

    const renderTask = ({ item }) => (
        <View style={tw`p-4 bg-gray-100 rounded-xl mr-4 shadow-md`}>
            <Text style={[tw`text-black font-bold text-lg`]}>{item.name}</Text>
            <Text style={tw`text-black`}>{item.task}</Text>
            <Text style={tw`text-gray-600`}>{item.donetill}</Text>
        </View>
    );

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
        if (scheduleData) {
            const pending = scheduleData.tasks
                .filter(task => task.status === "pending")
                .map((task, index) => ({
                    id: index.toString(),
                    name: "Car Wash Task",
                    donetill: `Created at: ${new Date(task.createdAt).toLocaleString()}`,
                    task: "Wash and clean car exterior and interior",
                }));

            const completed = scheduleData.tasks
                .filter(task => task.status === "completed")
                .map((task, index) => ({
                    id: (index + pending.length).toString(),
                    name: "Completed Task",
                    donetill: `Created at: ${new Date(task.createdAt).toLocaleString()}`,
                    task: "Completed task description",
                }));

            setPendingTasks(pending);
            setCompletedTasks(completed);
        }
    }, [scheduleData]);


    return (
            <SafeAreaView style={tw`flex-1 `}>

                <KeyboardAvoidingView
                    style={tw`flex bg-white`}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >

                    <ScrollView contentContainerStyle={tw` flex-grow`} showsVerticalScrollIndicator={false}>
                        <View style={tw`flex flex-row justify-between ml-5 mt-2`}>
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

                        {
                            !isOwner ? (
                                <>
                                    <View style={tw`flex flex-row align-middle justify-center bg-slate-200 p-5 mx-5 my-3 rounded-xl`}>
                                        <Text style={tw`bold text-md text-bold `}>Continue accepting orders ?</Text>

                                        <ToggleSwitch
                                            isOn={isaccept}
                                            onColor="blue"
                                            offColor="red"
                                            label={isaccept ? "On" : "Off"}
                                            labelStyle={{ color: "black", fontWeight: "900" }}
                                            size="small"
                                            onToggle={() => handleAccept()}
                                        />

                                    </View>
                                </>
                            ) : (null)
                        }



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
    )
};

export default CustomerHomeScreen;