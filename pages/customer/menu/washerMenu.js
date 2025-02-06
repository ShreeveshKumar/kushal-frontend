import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const WasherSelectionScreen = ({ route }) => {
  const navigation = useNavigation();
  const { formData } = route.params; // Assuming formData is passed correctly
  const [washer, setWashers] = useState([]);
  const [selectedWasher, setSelectedWasher] = useState(null);
  const [selectedOwner, setSelectedowner] = useState(null);
  const [isWasher, setWasher] = useState[(null)];

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
      setSelectedowner(data.info._id || {});
      console.log(selectedOwner);

    } catch (err) {
      console.log(err.message);
    }
  }

  const handleSelect = (washer) => {
    const { formData } = route.params;
    setSelectedWasher(washer._id); // Use _id for selection
    Alert.alert('Washer Selected', `You selected ${washer.username}`);
  };

  const handleSubmit = async () => {
    if (!selectedWasher) {
      Alert.alert('No Washer Selected', 'Please select a washer first.');
      return;
    }


    console.log(selectedWasher);

    const dataToSend = {
      formData: formData,
      washerId: selectedWasher,
      ownerId: selectedOwner
    };

    try {
      const response = await fetch("http://172.17.0.1:8000/api/user/post-task", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        Alert.alert('Error', result.message || 'Something went wrong');
      }

      if (response.status === 200) {
        console.log("Task added successfully");
        navigation.navigate("Homes")

      }
    } catch (error) {
      console.error('Error submitting washer selection:', error);
      Alert.alert('Error', 'Could not submit the selection');
    }
  };

  async function getwashers() {
    try {
      const response = await fetch("http://172.17.0.1:8000/api/get-washer", {
        method: "GET",
        headers: {
          'Content-type': "application/json"
        }
      });
      const data = await response.json();
      if (data && Array.isArray(data.users)) {
        setWashers(data.users); // Assuming 'users' contains the washer list
      } else {
        console.error("No users found in the response");
      }
    } catch (error) {
      console.error("Error fetching washers: ", error);
    }
  }

  // useEffect(() => {
  //   getwashers();
  //   fetchUser();
  // }, []);

  const renderWasher = ({ item }) => (
    <View
      style={tw`flex-row justify-between items-center bg-white p-4 m-2 rounded-lg shadow-md`}
    >
      <View>
        <Text style={tw`text-lg font-bold`}>{item.username}</Text>
        <Text style={tw`text-yellow-500`}>
          Rating: {item.washerDetails?.overallRating || "N/A"}
        </Text>
      </View>
      <TouchableOpacity
        style={tw`
          bg-blue-500 py-2 px-4 rounded-lg
          ${selectedWasher === item._id ? 'bg-green-500' : ''}
        `}
        onPress={() => handleSelect(item)}
      >
        <Text style={tw`text-white font-bold`}>
          {selectedWasher === item._id ? 'Selected' : 'Select'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      <Text style={tw`text-xl font-bold text-center mb-4`}>Choose a Washer</Text>
      <FlatList
        data={washer}
        keyExtractor={(item) => item._id}  // Use _id to uniquely identify washers
        renderItem={renderWasher}
      />
      <TouchableOpacity onPress={handleSubmit} style={tw`bg-blue-400 p-3 rounded-lg text-xl text-center `}>
        <Text style={tw`text-center `}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WasherSelectionScreen;
