import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const profileData = {
  name: 'Andy Fourati',
  photo: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bac7lmk6ZJ4OMjCyD5HJsmmORxhrRo.png',
  email: 'andy@example.com',
  password: '********',
  mobile: '+123 456 7890',
  vehicles: [
    { name: 'Tesla Model S', number: 'ABC 1234' },
    { name: 'BMW X5', number: 'XYZ 5678' },
    { name: 'Audi Q7', number: 'PQR 9101' }
  ]
};

const UserProfile = () => {
  useEffect(() => {
    const getUserinfo = async () => {
      try {
        const data = await AsyncStorage.getItem("user");
        const user = JSON.parse(data);

        // Fetch user info
        const response = await axios.post("http://192.168.28.243:8000/api/profile", user);
        const responsedata = response.data;
        
        console.log(responsedata); // Handle the response data
      } catch (err) {
        console.log(err.message);
      }
    };

    getUserinfo();
  }, []);

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`px-4 py-6`}>
        {/* Profile Header */}
        <View style={tw`items-center mb-6`}>
          <View style={tw`w-24 h-24 rounded-full overflow-hidden mb-3`}>
            <Image
              source={{ uri: profileData.photo }}
              style={tw`w-full h-full`}
              resizeMode="cover"
            />
          </View>
          <Text style={tw`text-xl font-semibold text-gray-800`}>
            {profileData.name}
          </Text>
        </View>

        {/* Profile Information Form */}
        <View style={tw`space-y-4 mb-6`}>
          <View>
            <Text style={tw`text-gray-600 mb-1`}>Email</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-3`}
              value={profileData.email}
              editable={false}
            />
          </View>

          <View>
            <Text style={tw`text-gray-600 mb-1`}>Name</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-3`}
              value={profileData.name}
              editable={false}
            />
          </View>

          <View>
            <Text style={tw`text-gray-600 mb-1`}>Password</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-3`}
              value={profileData.password}
              secureTextEntry={true}
              editable={false}
            />
          </View>

          <View>
            <Text style={tw`text-gray-600 mb-1`}>Mobile Number</Text>
            <TextInput
              style={tw`border border-gray-300 rounded-lg p-3`}
              value={profileData.mobile}
              editable={false}
            />
          </View>
        </View>

        {/* Vehicles List */}
        <Text style={tw`text-xl font-semibold text-gray-800 mb-4`}>Owned Vehicles</Text>
        <View style={tw`space-y-4`}>
          {profileData.vehicles.map((vehicle, index) => (
            <View key={index} style={tw`border p-4 rounded-lg border-gray-300`}>
              <Text style={tw`text-gray-700 font-medium`}>{vehicle.name}</Text>
              <Text style={tw`text-gray-500`}>{vehicle.number}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default UserProfile;
