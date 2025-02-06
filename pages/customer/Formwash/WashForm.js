import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from "react-native";
import { useEffect, useState } from "react";
import tw from "twrnc";
import * as ImagePicker from "expo-image-picker";
import Uploadimageicon from "../../../assets/imageupload.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { slottimes, occurrence } from "../../../data";
// import "../../../loader/loader.css";


function WashForm() {
    const navigation = useNavigation();
    const [specialArea, setSpecialArea] = useState("");
    const [day, setDay] = useState("");
    const [slot, setSlot] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null); // Separate state for slots
    const [selectedOccurrence, setSelectedOccurrence] = useState(null); // Separate state for occurrences
    const [image, setImage] = useState("");
    const [userinfo, setUserinfo] = useState({});
    const [userToken, setToken] = useState("");
    const [formData, setdata] = useState("");
    const [isloaded, setloaded] = useState(false);

    async function pickimage() {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permission to access camera roll is required!");
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0]?.uri || "");
        }
    }

    async function fetchUser() {
        try {

            const token = await AsyncStorage.getItem("token");
            const response = await fetch("http://172.17.0.1:8000/api/user/get-user", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            setUserinfo(data.info || {});
        } catch (err) {
            console.log(err.message);
        }
    }

    // useEffect(() => {
    //     setdata({
    //         specialArea, day, slot, occurrence: selectedOccurrence
    //     })

    //     fetchUser();
    // }, [specialArea, day, slot, selectedOccurrence]);

    function submitForm() {
        navigation.navigate("selectwasher", { formData });
    }

    return (
        isloaded ? (
            <>
             <View style={tw`h-full w-full`} className="loader"></View>
            </>
        ) : (
            <ScrollView style={tw`bg-white`}>
                <View style={tw`flex-1 p-4`}>
                    {/* Image Picker */}
                    <View style={tw`flex items-center justify-center my-6 mt-10 `}>
                        <TouchableOpacity onPress={pickimage}>
                            <View style={[tw`p-6 border-2 border-gray-400 rounded-lg`, { width: 120, height: 120 }]}>
                                <Image
                                    source={image ? { uri: image } : Uploadimageicon}
                                    style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                                />
                            </View>
                            <Text style={tw`mt-2 text-gray-700 text-sm`}>Pick an image</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Form Inputs */}
                    <View style={tw`p-6`}>
                        <Text style={tw`text-lg font-semibold mb-2`}>Description</Text>
                        <TextInput
                            style={tw`border border-gray-300 p-4 rounded-lg bg-white mb-4`}
                            placeholder="Enter details for the special area"
                            value={specialArea}
                            placeholderTextColor="grey"
                            multiline
                            onChangeText={setSpecialArea}
                        />

                        <Text style={tw`text-lg font-semibold mb-2`}>Day</Text>
                        <TextInput
                            style={tw`border border-gray-300 p-4 rounded-lg bg-white mb-4`}
                            placeholder="Enter the day"
                            value={day}
                            onChangeText={setDay}
                        />

                        <Text style={tw`text-lg font-semibold mb-2`}>Occurrence</Text>
                        {occurrence.map((data) => (
                            <TouchableOpacity
                                key={data.id}
                                onPress={() => setSelectedOccurrence(data.option)} // Set the selected option
                                style={[
                                    tw`p-4 rounded-lg m-2`,
                                    selectedOccurrence === data.option ? styles.active : styles.inactive, // Compare with data.option
                                ]}
                            >
                                <Text style={tw`text-center text-white`}>{data.option}</Text>
                            </TouchableOpacity>
                        ))}


                        <Text style={tw`text-lg font-semibold mb-2`}>Slot</Text>
                        <View style={tw`flex flex-row flex-wrap justify-around`}>
                            {slottimes.map((data) => (
                                <TouchableOpacity
                                    key={data.id}
                                    onPress={() => {
                                        setSelectedSlot(data.id);
                                        setSlot(data.time);
                                    }}
                                    style={[
                                        tw`p-4 rounded-lg m-2`,
                                        selectedSlot === data.id ? styles.active : styles.inactive,
                                    ]}
                                >
                                    <Text style={tw`text-center text-white`}>{data.time}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>


                        <Text style={tw`text-lg font-semibold mb-2`}>Personal Details</Text>
                        <View style={tw`p-4 rounded-lg bg-gray-100`}>
                            <Text>Name: {userinfo.username || "N/A"}</Text>
                            <Text>Phone: {userinfo.phone || "N/A"}</Text>
                            <Text>Address: {userinfo.address || "N/A"}</Text>
                        </View>

                        <TouchableOpacity onPress={submitForm} style={tw`bg-black p-4 rounded-lg mt-6`}>
                            <Text style={tw`text-white text-center text-lg`}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    )
}

const styles = StyleSheet.create({
    active: { backgroundColor: "green" },
    inactive: { backgroundColor: "black" },
});

export default WashForm;
