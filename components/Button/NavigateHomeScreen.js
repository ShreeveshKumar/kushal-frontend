import { View,Text,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Entypo from '@expo/vector-icons/Entypo';
import tw from "twrnc";


const NavigateButton = ({ text, page }) => {
    const navigation = useNavigation();

    return (
        <View style={tw`p-5`}>
            <TouchableOpacity
                style={[
                    tw`flex flex-row justify-center items-center bg-blue-800 py-4 px-10 rounded-xl shadow-lg`,
                    { transform: [{ skewX: '-12deg' }] }
                ]}
                onPress={() => navigation.navigate(page)}
            >
                <Entypo name="plus" size={24} color="white" />
                <Text style={[tw`text-white text-lg ml-2`]}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}


export default NavigateButton;