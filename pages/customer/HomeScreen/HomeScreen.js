import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    FlatList,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import Banner from '../../../components/Banner/Banner';
import Footer from '../../../components/Footer/Footer';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import ToggleSwitch from 'toggle-switch-react-native';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { useScheduleData } from 'hooks/useHomedata';
import { useUserrole } from 'hooks/useUserrole';
// import ContentLoader, { Facebook } from 'react-content-loader'
import NavigateButton from '../../../components/Button/NavigateHomeScreen';
import RatingComponent from '../../../components/Ratings/Rating';
import { SafeAreaView } from 'react-native-safe-area-context';

const MyLoader = () => (
    <ContentLoader viewBox="0 0 380 70">
        <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
        <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
        <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
    </ContentLoader>
);

const CustomerHomeScreen = () => {
    const navigation = useNavigation();
    const [isOwner, setIsOwner] = useState(false);
    const [isAccept, setIsAccept] = useState(true);

    const { data: scheduleData, isLoading: isScheduleLoading } = useScheduleData();
    const { data: userRoleData } = useUserrole();

    useEffect(() => {
        setIsOwner(userRoleData?.role !== 'washer');
    }, [userRoleData]);

    const handleAccept = () => setIsAccept(prev => !prev);

    const [pendingTasks, completedTasks] = useMemo(() => {
        if (!scheduleData?.tasks) return [[], []];

        const pending = scheduleData.tasks
            .filter(task => task.status === 'pending')
            .map((task, index) => ({
                id: index.toString(),
                name: 'Car Wash Task',
                donetill: `Created at: ${new Date(task.createdAt).toLocaleString()}`,
                task: 'Wash and clean car exterior and interior',
            }));

        const completed = scheduleData.tasks
            .filter(task => task.status === 'completed')
            .map((task, index) => ({
                id: (index + pending.length).toString(),
                name: 'Completed Task',
                donetill: `Created at: ${new Date(task.createdAt).toLocaleString()}`,
                task: 'Completed task description',
            }));

        return [pending, completed];
    }, [scheduleData]);

    const renderTask = useCallback(({ item }) => (
        <View style={tw`p-4 bg-gray-100 rounded-xl mr-4 shadow-md`}>
            <Text style={tw`text-black font-bold text-lg`}>{item.name}</Text>
            <Text style={tw`text-black`}>{item.task}</Text>
            <Text style={tw`text-gray-600`}>{item.donetill}</Text>
        </View>
    ), []);

    return (
        <SafeAreaView style={tw`flex-1`}>
            <KeyboardAvoidingView
                style={tw`flex bg-white`}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={tw`flex-grow`} showsVerticalScrollIndicator={false}>

                    {/* Header */}
                    <View style={tw`flex flex-row justify-between ml-5 mt-2`}>
                        <Text style={tw`text-3xl font-semibold`}>Welcome</Text>
                        <View style={tw`flex flex-row`}>
                            <TouchableOpacity onPress={() => navigation.navigate('Tips')}>
                                <AntDesign name="pushpino" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
                                <Ionicons name="notifications" size={24} color="black" style={tw`mx-5`} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Order Toggle for Washer */}
                    {!isOwner && (
                        <View style={tw`flex-row justify-center bg-slate-200 p-5 mx-5 my-3 rounded-xl`}>
                            <Text style={tw`text-md font-bold mr-2`}>Continue accepting orders?</Text>
                            <ToggleSwitch
                                isOn={isAccept}
                                onColor="blue"
                                offColor="red"
                                label={isAccept ? 'On' : 'Off'}
                                labelStyle={{ color: 'black', fontWeight: '900' }}
                                size="small"
                                onToggle={handleAccept}
                            />
                        </View>
                    )}

                    {/* Banner */}
                    <ImageBackground
                        source={{ uri: 'https://cdni.iconscout.com/illustration/premium/thumb/taxi-service-illustration-download-in-svg-png-gif-file-formats--car-booking-application-book-cab-travel-pack-holidays-illustrations-9530586.png' }}
                        resizeMode="cover"
                        style={tw`w-full h-64`}
                    />

                    {/* Navigation Button */}
                    <NavigateButton text={isOwner ? 'Add your car wash here' : 'See your schedule today'} page={isOwner ? 'WashForm' : 'ScheduleCard'} />

                    {/* Pending Tasks */}
                    <View style={tw`p-5`}>
                        <Text style={tw`text-black text-xl mb-3`}>Scheduled Tasks</Text>
                       
                            <FlatList
                                data={pendingTasks}
                                renderItem={renderTask}
                                keyExtractor={item => item.id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                nestedScrollEnabled
                            />
                    </View>

                    {/* Promotional Banner */}
                    <View style={tw`w-full my-4 overflow-hidden`}>
                        <Banner backgroundUri="https://www.shutterstock.com/image-vector/car-cartoon-banner-260nw-1312346801.jpg" heading="" subHeading="" />
                    </View>

                    {/* Completed Tasks */}
                    <View style={tw`p-5`}>
                        <Text style={tw`text-black text-xl mb-3`}>Completed Tasks</Text>
                        <FlatList
                            data={completedTasks}
                            renderItem={renderTask}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            nestedScrollEnabled
                        />
                    </View>

                    {/* Rating and Footer */}
                    <RatingComponent />
                    <Footer backgroundImageUri="https://img.pikbest.com/ai/illus_our/20230427/59f10732ce81427c6ecd242c2eed0b0f.jpg" heading="We are with you in every moment" description="Contact now" />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default CustomerHomeScreen;