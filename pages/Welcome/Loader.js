import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import Animated, {
    Easing,
    withTiming,
    withSequence,
    useSharedValue,
    useAnimatedStyle,
    withDelay,
    runOnUI
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-toast-message';


const { height } = Dimensions.get("window");

export default function LoaderScreen() {

    const [islogged, setlogged] = useState(false);


    useEffect(()=>{


    const checkLogin = async () => {
        try {
            const result = await AsyncStorage.getItem("user");
            const user = JSON.parse(result);

            if (!result) {
                setlogged(false);
                return;
            }
            const response = await axios.post('http://59.145.191.138:8000/api/validate', { token:user.token });

            if (response.data.isLoggedIn) {
                console.log('User is logged in');
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Success!',
                    text2: 'User is logged in.',
                });
                setlogged(true);
            } else {
                console.log('User is not logged in');
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Login failed',
                    text2: 'User is not logged in.',
                });
                setlogged(false);
            }
        } catch (err) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: 'Invalid or expired token.',
            });
        }
    }
    checkLogin();
},[]);




    const navigation = useNavigation();

    const logoScale = useSharedValue(0);
    const logoTranslateY = useSharedValue(height / 2);
    const illustrationOpacity = useSharedValue(0);
    const illustrationTranslateY = useSharedValue(50);
    const contentOpacity = useSharedValue(0);
    const contentTranslateY = useSharedValue(50);

    const logoStyle = useAnimatedStyle(() => ({
        transform: [{ scale: logoScale.value }, { translateY: logoTranslateY.value }],
    }));

    const illustrationStyle = useAnimatedStyle(() => ({
        opacity: illustrationOpacity.value,
        transform: [{ translateY: illustrationTranslateY.value }],
    }));

    const contentStyle = useAnimatedStyle(() => ({
        opacity: contentOpacity.value,
        transform: [{ translateY: contentTranslateY.value }],
    }));

    useEffect(() => {
        runOnUI(() => {
            logoScale.value = withSequence(
                withTiming(1.2, { duration: 800, easing: Easing.out(Easing.ease) }),
                withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) })
            );

            logoTranslateY.value = withTiming(0, {
                duration: 1000,
                easing: Easing.out(Easing.ease),
            });

            illustrationOpacity.value = withDelay(1000, withTiming(1, { duration: 800 }));
            illustrationTranslateY.value = withDelay(
                1000,
                withTiming(0, { duration: 800, easing: Easing.out(Easing.ease) })
            );

            contentOpacity.value = withDelay(1400, withTiming(1, { duration: 800 }));
            contentTranslateY.value = withDelay(
                1400,
                withTiming(0, { duration: 800, easing: Easing.out(Easing.ease) })
            );
        })();
    }, []); // Removed dependencies to avoid unnecessary re-renders

    return (
        <SafeAreaView style={tw`flex-1 bg-white`}>
            <View style={tw`flex-1 items-center`}>
                <Animated.View style={[tw`w-48 h-48 flex items-center justify-center mt-10 m-15`, logoStyle]}>
                    <Image source={require("../../assets/carcarelogo.png")} />
                </Animated.View>

                {/* <Animated.View style={illustrationStyle}>
          <Image source={{ uri: "https://cdni.iconscout.com/illustration/premium/thumb/taxi-service-illustration-download-in-svg-png-gif-file-formats--car-booking-application-book-cab-travel-pack-holidays-illustrations-9530586.png" }}
          style={tw`w-96 h-74 resize-contain mb-6`} />
        </Animated.View> */}

                <Animated.View style={[tw`items-center`, contentStyle]}>
                    <Text style={tw`text-3xl font-bold mb-4 text-center text-blue-700`}>
                        Welcome
                    </Text>

                    <Text style={tw`text-center text-gray-600 text-base mb-6 w-66`}>
                        Connecting car owners with trusted washers for on-demand cleaning.
                    </Text>

                    <TouchableOpacity
                        onPress={() => islogged ? navigation.navigate("HomeScreen") : navigation.navigate("Login")}
                        style={tw`w-84 bg-blue-800 py-2 rounded-lg`}
                    >
                        <Text style={tw`text-white text-center text-base font-medium px-6 py-3`}>Let's Go </Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}
