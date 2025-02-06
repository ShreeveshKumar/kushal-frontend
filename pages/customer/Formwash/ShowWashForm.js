import { View, Text, ScrollView, Image } from 'react-native';
import { personalDetails, slottimes } from '../../../data';
import { useEffect, useState } from 'react';
import tw from 'twrnc';
import Uploadimageicon from "../../../assets/imageupload.png";

function WashFormReadOnly({task}) {
    const [specialArea, setSpecialArea] = useState('Special Cleaning Area Details');
    const [day, setDay] = useState('Monday');
    const [slot, setSlot] = useState('9:00 AM - 10:00 AM');
    const [selected, setSelected] = useState(null);
    const [image, setImage] = useState("");

    // useEffect(() => {
    //     // Mock existing image URL
    //     setImage("https://via.placeholder.com/150");
    // }, []);

    return (
        <ScrollView style={tw`bg-white`}>
            <View style={tw`flex-1 p-4`}>
                {/* Image Section */}
                <View style={tw`flex items-center justify-center my-6`}>
                    <View style={[tw`p-6 border-2 border-gray-400 rounded-lg`, { width: 120, height: 120 }]}>
                        <Image
                            source={image ? { uri: image } : Uploadimageicon}
                            style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                        />
                    </View>
                </View>

                <View style={tw`p-6`}>
                    <Text style={tw`text-lg font-semibold mb-2`}>Special Area</Text>
                    <View style={tw`border border-gray-300 p-4 rounded-lg bg-gray-100 mb-4`}>
                        <Text style={tw`text-base text-gray-700`}>{task.description}</Text>
                    </View>

                    <Text style={tw`text-lg font-semibold mb-2`}>Day</Text>
                    <View style={tw`border border-gray-300 p-4 rounded-lg bg-gray-100 mb-4`}>
                        <Text style={tw`text-base text-gray-700`}>{day}</Text>
                    </View>

                    <Text style={tw`text-lg font-semibold mb-2`}>Slot</Text>
                    <View style={tw`border border-gray-300 p-4 rounded-lg bg-gray-100 mb-4`}>
                        <Text style={tw`text-base text-gray-700`}>{slot}</Text>
                    </View>

                    <Text style={tw`text-lg font-semibold mb-2`}>Personal Details</Text>
                    <View style={tw`p-4 rounded-lg bg-gray-100`}>
                        {Object.entries(personalDetails).map(([key, value]) => (
                            <View key={key} style={tw`mb-2`}>
                                <Text style={tw`text-sm font-semibold capitalize`}>{key}</Text>
                                <Text style={tw`text-base`}>{value}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default WashFormReadOnly;
