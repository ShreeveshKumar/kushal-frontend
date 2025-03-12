import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { useState, useRef } from 'react';

const CreditCardUI = () => {
    const [flipped, setFlipped] = useState(false);
    const rotateValue = useRef(new Animated.Value(0)).current; // Persistent animation state

    const flipCard = () => {
        Animated.timing(rotateValue, {
            toValue: flipped ? 0 : 1,  // If flipped, rotate back to 0
            duration: 800,  // Slower animation
            easing: Easing.inOut(Easing.ease), // Corrected easing function
            useNativeDriver: true,
        }).start(() => setFlipped(!flipped)); // Toggle the flipped state
    };

    const frontInterpolate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    const backInterpolate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg']
    });

    return (
        <SafeAreaView>

            <TouchableOpacity onPress={flipCard} style={tw`w-80 h-48`}>
                <View style={tw`w-80 h-48 relative`}>
                    {/* Front Side */}
                    <Animated.View style={[
                        tw`absolute w-full h-full rounded-xl justify-center items-center  bg-black`,
                        {
                            transform: [{ rotateY: frontInterpolate }],
                            // backgroundColor: "#2563EB",
                            backfaceVisibility: 'hidden'
                        }
                    ]}>
                        <View style={tw`w-full `}>
                        <Text style={tw`text-white text-lg font-bold text-right px-5 `}>CarCare</Text>
                        </View>
                        <View style={tw`w-full px-5`}>
                            <Text style={tw`text-white text-xl font-semibold text-start`}>John Doe</Text>
                        </View>
                        <Text style={tw`text-white text-sm mt-5`}>Tap to see your current balance </Text>
                    </Animated.View>

                    {/* Back Side */}
                    <Animated.View style={[
                        tw`absolute w-full h-full rounded-xl justify-center items-center bg-black`,
                        {
                            transform: [{ rotateY: backInterpolate }],
                            backfaceVisibility: 'hidden'
                        }
                    ]}>
                       <View style={tw`w-full `}>

<View>
    <Text style={tw`text-white text-center `}>Coupons available </Text>
</View>


                       </View>
                    </Animated.View>
                </View>
            </TouchableOpacity>
        </SafeAreaView>

    );
}

export default CreditCardUI;
