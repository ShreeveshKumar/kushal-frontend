import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import tw from 'twrnc';

const Banner = ({ backgroundUri, heading, subHeading }) => {
    return (
        <ImageBackground
            source={{ uri: backgroundUri }}
            style={[tw`w-full  justify-center items-center align-middle `, styles.backgroundImage]}
            resizeMode="cover"
        >
            <View style={tw` bg-opacity-50 p-5 rounded-lg`}>
                <Text style={[tw`text-white text-2xl font-bold mb-2`, styles.heading]}>
                    {heading}
                </Text>
                <Text style={[tw`text-gray-200 text-base`, styles.subHeading]}>
                    {subHeading}
                </Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    heading: {
        fontFamily: 'IBMPlexSans-Medium', // Ensure you load this font in your project
    },
    subHeading: {
        fontFamily: 'IBMPlexSans-Regular',
    },
});

export default Banner;
