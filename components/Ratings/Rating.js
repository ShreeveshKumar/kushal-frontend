import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import tw from 'twrnc';

const RatingComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);

  // Function to handle rating button press
  const handleRatePress = () => {
    setModalVisible(false);
    console.log('Redirecting to rating platform...');
    // You can redirect to the app store or Google Play store to leave a rating
  };

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      {/* Button to open the modal */}
      <TouchableOpacity
        style={tw`px-6 py-2 bg-blue-500 rounded-full`}
        onPress={() => setModalVisible(true)}
      >
        <Text style={tw`text-white font-semibold`}>Rate Our App</Text>
      </TouchableOpacity>

      {/* Modal to display the rating prompt */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white p-6 rounded-lg w-4/5`}>
            <Text style={tw`text-xl font-semibold text-center mb-4`}>
              Love our app? Rate it here!
            </Text>
            <Text style={tw`text-center mb-4`}>
              Your feedback helps us improve. Please take a moment to rate the app!
            </Text>
            <TouchableOpacity
              style={tw`bg-green-500 px-6 py-2 rounded-full mb-4`}
              onPress={handleRatePress}
            >
              <Text style={tw`text-white font-bold`}>Rate Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-gray-300 px-6 py-2 rounded-full`}
              onPress={() => setModalVisible(false)}
            >
              <Text style={tw`text-black font-bold`}>Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RatingComponent;
