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
import DropDownPicker from 'react-native-dropdown-picker';
import axios from "axios";

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
    const [selectedcar, setselectedcar] = useState("");
    const [cars, setCars] = useState([]);

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



    const getVehicles = async () => {
        try {
            const token = await AsyncStorage.getItem(("user"));
            const userinfo = JSON.parse(token);
            const response = await axios.get("http://172.17.0.1:8000/api/vehicle/getvehicle", {
                headers: {
                    Authorization: `Bearer ${userinfo.token}`
                }
            })

            if (response.status) {
                const user = response.data;
                console.log(user);

                setCars(user.vehicles);
            }


        } catch (err) {
            console.log(err.message);

        }
    }

    async function fetchUser() {
        try {

            const token = await AsyncStorage.getItem(("user"));
            const user = JSON.parse(token);
            const response = await axios.get("http://172.17.0.1:8000/api/get-info-owner", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const userinfo = response.data;
            console.log("Data is ", userinfo.data);

            setUserinfo(userinfo.data || {});
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
        console.log(formData);

        const formData = {
            vehicle: selectedcar,
            specialArea,
            day,
            occurrence: selectedOccurrence,
            slot:selectedSlot,
            selectedcar,
        };

        navigation.navigate("WasherSelection", { formData });
    }


    useEffect(() => {
        getVehicles();
        fetchUser();
    }, [])

    const [opendrp, setopendrp] = useState(false);

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


                    <View>
                        <Text>Select your car</Text>
                        <DropDownPicker
                            open={opendrp}
                            value={selectedcar}
                            items={cars.map((car) => ({
                                label: car.vehiclename,
                                value: car.vehiclename,
                                license: car.license,
                            }))}
                            setOpen={setopendrp}
                            setItems={setCars}
                            setValue={setselectedcar}
                            placeholder="Select a car"
                            dropDownStyle={{ backgroundColor: "#fafafa" }} // Dropdown styling
                        />
                    </View>


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
                        <Text>Phone: {userinfo.email || "N/A"}</Text>
                        <Text>Address: {userinfo.address || "N/A"}</Text>
                    </View>

                    <TouchableOpacity onPress={submitForm} style={tw`bg-black p-4 rounded-lg mt-6`}>
                        <Text style={tw`text-white text-center text-lg`}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        )
    )
}

const styles = StyleSheet.create({
    active: { backgroundColor: "green" },
    inactive: { backgroundColor: "black" },
});

export default WashForm;
