import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UserProfile = () => {
  const [userinfo, setUserinfo] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const token = await AsyncStorage.getItem("user");
      const user = JSON.parse(token);
      const response = await axios.get("http://172.17.0.1:8000/api/get-info-owner", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      console.log("User Data: ", response.data);
      setUserinfo(response.data.data); // Fix this line
    } catch (err) {
      console.log(err.message);
    }
  }

  const getVehicles = async () => {
    try {
      const token = await AsyncStorage.getItem(('user'));
      const userinfo = JSON.parse(token);
      const response = await axios.get('http://172.17.0.1:8000/api/vehicle/getvehicle', {
        headers: {
          Authorization: `Bearer ${userinfo.token}`,
        },
      });

      if (response.status === 200) {
        console.log("Setting vehicles state: ", response.data.vehicles);
        setCars(response.data.vehicles || []);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchUser();
    getVehicles();
  }, []);

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`px-4 py-6`}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : userinfo ? (
          <>
            <View style={tw`items-center mb-6`}>
              <View style={tw`w-24 h-24 rounded-full overflow-hidden mb-3`}>
                <Image
                  source={{ uri: userinfo.photo || 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' }}
                  style={tw`w-full h-full`}
                  resizeMode="cover"
                />
              </View>
              <Text style={tw`text-xl font-semibold text-gray-800`}>{userinfo.username || 'N/A'}</Text>
            </View>

            <View style={tw`space-y-4 mb-6`}>
              <View>
                <Text style={tw`text-gray-600 mb-1`}>Email</Text>
                <TextInput
                  style={tw`border border-gray-300 rounded-lg p-3 text-gray-400`}
                  value={userinfo.email || ''}
                  editable={false}
                />
              </View>

              <View>
                <Text style={tw`text-gray-600 mb-1`}>Password</Text>
                <TextInput
                  style={tw`border border-gray-300 rounded-lg p-3 text-gray-400`}
                  value={'********'}
                  secureTextEntry
                  editable={false}
                />
              </View>

              <View>
                <Text style={tw`text-gray-600 mb-1`}>Mobile Number</Text>
                <TextInput
                  style={tw`border border-gray-300 rounded-lg p-3 text-gray-400`}
                  value={userinfo.mobile || ''}
                  editable={false}
                />
              </View>
            </View>

            <Text style={tw`text-xl font-semibold text-gray-800 mb-4`}>Owned Vehicles</Text>
            <View style={tw`space-y-4`}>
              {cars.length > 0 ? (
                cars.map((vehicle, index) => (
                  <View key={index} style={tw`border p-4 rounded-lg border-gray-300`}>
                    <Text style={tw`text-gray-700 font-medium`}>
                      {vehicle.vehiclename || "No Name"}
                    </Text>
                    <Text style={tw`text-gray-500`}>
                      {vehicle.license || "No License"}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={tw`text-gray-500`}>No vehicles found.</Text>
              )}

            </View>
          </>
        ) : (
          <Text style={tw`text-gray-500 text-center`}>Failed to load user data.</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default UserProfile;
