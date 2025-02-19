'use client';

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import tw from 'twrnc';
import * as Progress from 'react-native-progress';

export default function TaskView() {
    const [progress, setProgress] = useState(0.75); // 75% progress initially

    const updateProgress = () => {
        setProgress(progress >= 1 ? 0 : progress + 0.25);
    };

    return (
        <View style={tw`flex-1 bg-white`}>
           

            {/* Order Info */}
            <View style={tw`p-4 flex-row`}>
                <Image
                    source={{ uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ykwr3t8xJA0RJmsVCFCRtiOuxW965w.png" }}
                    style={tw`w-20 h-20`}
                />
                <View style={tw`ml-4`}>
                    <Text style={tw`text-gray-600`}>Order Id : EZCP55200</Text>
                    <Text style={tw`text-gray-600 mt-2`}>Amount : Rs. 300</Text>
                    <Text style={tw`text-gray-600 mt-2`}>No. of clothes : 20 regular</Text>
                    <Text style={tw`text-gray-600 mt-2`}>Order Date : 2019-06-01 00:00:00</Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={tw`px-4 py-2`}>
                <TouchableOpacity
                    style={tw`bg-gray-400 rounded-md py-2 mb-2`}
                >
                    <Text style={tw`text-white text-center`}>Need Help ?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={tw`bg-gray-400 rounded-md py-2`}
                >
                    <Text style={tw`text-white text-center`}>Rate</Text>
                </TouchableOpacity>
            </View>

            <Text style={tw`px-4 py-2 text-gray-600 underline`}>Terms and Conditions</Text>

            {/* Progress Timeline */}
            <View style={tw`px-4 mt-4`}>
                <Progress.Bar
                    progress={progress}
                    width={null}
                    height={2}
                    color="#4CAF50"
                    unfilledColor="#E5E7EB"
                    borderWidth={0}
                />

                <View style={tw`flex-row justify-between mt-2`}>
                    <View style={tw`items-center flex-1`}>
                        <Text style={tw`text-xs text-gray-600`}>Picked</Text>
                        <Text style={tw`text-xs text-gray-500`}>01-06-2019 | 01:32</Text>
                    </View>
                    <View style={tw`items-center flex-1`}>
                        <Text style={tw`text-xs text-gray-600`}>Under Processing</Text>
                        <Text style={tw`text-xs text-gray-500`}>01-06-2019 | 01:55</Text>
                    </View>
                    <View style={tw`items-center flex-1`}>
                        <Text style={tw`text-xs text-gray-600`}>Ready for delivery</Text>
                        <Text style={tw`text-xs text-gray-500`}>01-06-2019 | 01:56</Text>
                    </View>
                    <View style={tw`items-center flex-1`}>
                        <Text style={tw`text-xs text-gray-600`}>Delivered</Text>
                        <Text style={tw`text-xs text-gray-500`}>01-06-2019 | 01:56</Text>
                    </View>
                </View>

                {/* Update Progress Button */}
                <TouchableOpacity
                    style={tw`bg-green-500 rounded-md py-2 mt-4`}
                    onPress={updateProgress}
                >
                    <Text style={tw`text-white text-center`}>Update Progress</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}