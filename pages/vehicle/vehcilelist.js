import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const Vehiclelist = () => {
  const [cars, setCars] = useState([
    {
      id: '1',
      licenseNumber: 'ABC123',
      carPicture: 'https://via.placeholder.com/150',
      lastServiced: '2025-01-01',
    },
    {
      id: '2',
      licenseNumber: 'XYZ789',
      carPicture: 'https://via.placeholder.com/150',
      lastServiced: '2024-12-15',
    },
  ]);

  const addNewCar = () => {
    const newCar = {
      id: `${cars.length + 1}`,
      licenseNumber: `NEW${Math.floor(Math.random() * 1000)}`,
      carPicture: 'https://via.placeholder.com/150',
      lastServiced: new Date().toISOString().split('T')[0],
    };
    setCars([...cars, newCar]);
  };

  const renderCarCard = ({ item }) => (
    <View style={tw`bg-white p-4 rounded-lg shadow-lg mb-4`}>
      <Image
        source={{ uri: item.carPicture }}
        style={tw`w-full h-40 rounded-lg mb-3`}
      />

      <Text style={tw`text-lg font-bold`}>License Number: {item.licenseNumber}</Text>
      <Text style={tw`text-base text-gray-600`}>Last Serviced: {item.lastServiced}</Text>
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
        onPress={addNewCar}
      >
        <Text style={tw`text-white text-lg font-bold text-center`}>+ Add Car</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Vehiclelist;
