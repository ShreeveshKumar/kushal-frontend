import React from "react";
import { View,Text } from "react-native";

 const RenderTask = ({ item }) => (
        <View style={tw`p-4 bg-gray-100 rounded-xl mr-4 shadow-md`}>
            <Text style={[tw`text-black font-bold text-lg`]}>{item.name}</Text>
            <Text style={tw`text-black`}>{item.task}</Text>
            <Text style={tw`text-gray-600`}>{item.donetill}</Text>
        </View>
    );



export default RenderTask