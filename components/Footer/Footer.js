import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import tw from 'twrnc';
import carimg from "../../assets/car.jpg"

const Footer = ({ backgroundImageUri, heading, description }) => {
    
  return (
    <ImageBackground
      source={carimg}
      resizeMode="cover"
      style={tw`h-40 w-full`}
      imageStyle={tw`rounded-t-xl`}
    >
      <View style={[tw`flex-1 justify-center items-center`, styles.overlay]}>
        <Text style={[tw`text-2xl font-bold text-white mb-2`, styles.heading]}>{heading}</Text>
        <View style={[tw`px-4 py-2 rounded-lg`, styles.textContainer]}>
          <Text style={tw`text-base text-gray-800 text-center`}>{description}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dim overlay for better text visibility
    alignContent:"flex-start",
    alignItems:"flex-start",
    padding:"10"
  },
  heading: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // White with slight transparency
  },

});

export default Footer;
