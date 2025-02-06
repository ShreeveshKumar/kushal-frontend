import { useNavigation } from "@react-navigation/native";
import {View,Text,TouchableOpacity} from "react-native";
import tw from "twrnc";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


function ScheduledCard({ name, donetill, task }) {
    const navigation = useNavigation();
    return (
        <View style={tw`border-0 px-2 my-2`}>
            <View
                style={tw`flex w-30 border-black border-2 px-5 py-2 rounded-md justify-between align-middle items-center`}
            >
                <AntDesign name="car" size={32} color="white" />
                <View style={tw`flex items-center`}>
                    <Text style={[tw`text-white text-xl text-center`, { fontFamily: "titlefont" }]}>
                        {name}
                    </Text>
                    <Text style={tw`text-white`}>{donetill}</Text>
                    <Text style={tw`text-white`}>{task}</Text>

                </View>
                <TouchableOpacity onPress={() => navigation.navigate("showwashform", { name })}>
                    <MaterialIcons name="keyboard-arrow-right" size={32} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default ScheduledCard;