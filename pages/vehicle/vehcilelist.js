import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

const Vehiclelist = () => {
  const [cars, setCars] = useState([]);
  const navigation = useNavigation();


  const getVehicles = async () => {
    try {
      const token = await AsyncStorage.getItem(("user"));
      const userinfo = JSON.parse(token);
      const response = await axios.get("http://172.17.0.1:8000/api/vehicle/getvehicle", {
        headers: {
          Authorization: `Breare ${userinfo.token}`
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

  useEffect(() => {
    getVehicles();
  });


  const renderCarCard = ({ item }) => (
    <View style={tw`bg-white p-4 rounded-lg shadow-lg mb-4`}>
      <Image
        source={{ uri: item.carPicture }}
        style={tw`w-full h-40 rounded-lg mb-3`}
      />

      <Text style={tw`text-lg font-bold`}>License Number: {item.license}</Text>
      <Text style={tw`text-base text-gray-600`}>Last Serviced: {item.lastserviced}</Text>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-gray-100 p-4`}>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={renderCarCard}
        contentContainerStyle={tw`pb-20`}
      />

      <TouchableOpacity
        style={tw`bg-blue-500 p-4 rounded-full absolute bottom-5 right-5 shadow-lg`}
        onPress={() => navigation.navigate('Addcar')}
      >
        <Text style={tw`text-white text-lg font-bold text-center`}>+ Add Car</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Vehiclelist;
