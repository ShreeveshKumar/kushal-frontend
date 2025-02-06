import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';

const AddVehicleScreen = () => {
  const [vehicles, setVehicles] = useState([
    {
      id: '1',
      name: 'Honda Civic',
      licenseNumber: 'ABC1234',
      description: 'A reliable family car with excellent mileage.',
      lastServiced: '2025-01-01',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Tesla Model 3',
      licenseNumber: 'XYZ5678',
      description: 'A modern electric car with autopilot features.',
      lastServiced: '2024-12-15',
      image: 'https://via.placeholder.com/150',
    },
  ]);

  const [newVehicle, setNewVehicle] = useState({
    name: '',
    licenseNumber: '',
    description: '',
    lastServiced: '',
  });

  const handleAddVehicle = () => {
    if (
      newVehicle.name &&
      newVehicle.licenseNumber &&
      newVehicle.description &&
      newVehicle.lastServiced
    ) {
      setVehicles([
        ...vehicles,
        { ...newVehicle, id: (vehicles.length + 1).toString() },
      ]);
      setNewVehicle({
        name: '',
        licenseNumber: '',
        description: '',
        lastServiced: '',
        image: 'https://via.placeholder.com/150',
      });
    }
  };


  const handleUser = async () => {
    const userinfo = await AsyncStorage.getItem("user");
  }

  return (
    <ScrollView contentContainerStyle={tw`p-5 bg-gray-100`}>
      {/* Form Section */}
      <View style={tw`mb-5 bg-white p-5 rounded-lg shadow-lg`}>
        <Text style={tw`text-xl font-bold mb-3`}>Add Vehicle</Text>

        {/* Image */}
        <Image
          source={{ uri: newVehicle.image }}
          style={tw`w-full h-40 rounded-lg mb-3`}
        />

        {/* Name */}
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
          placeholder="Vehicle Name"
          value={newVehicle.name}
          onChangeText={(text) => setNewVehicle({ ...newVehicle, name: text })}
        />

        {/* License Number */}
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
          placeholder="License Number"
          value={newVehicle.licenseNumber}
          onChangeText={(text) =>
            setNewVehicle({ ...newVehicle, licenseNumber: text })
          }
        />

        {/* Description */}
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
          placeholder="Description"
          value={newVehicle.description}
          onChangeText={(text) =>
            setNewVehicle({ ...newVehicle, description: text })
          }
        />

        {/* Last Serviced */}
        <TextInput
          style={tw`border border-gray-300 rounded-lg p-3 mb-3`}
          placeholder="Last Serviced (YYYY-MM-DD)"
          value={newVehicle.lastServiced}
          onChangeText={(text) =>
            setNewVehicle({ ...newVehicle, lastServiced: text })
          }
        />

        {/* Add Button */}
        <TouchableOpacity
          style={tw`bg-blue-500 p-4 rounded-lg`}
          onPress={handleAddVehicle}
        >
          <Text style={tw`text-white text-center font-bold text-lg`}>
            Add Vehicle
          </Text>
        </TouchableOpacity>
      </View>

      {/* List of Vehicles */}

    </ScrollView>
  );
};

export default AddVehicleScreen;
