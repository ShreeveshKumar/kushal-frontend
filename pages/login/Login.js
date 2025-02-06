import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import tw from 'twrnc';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [isOwner, setOwner] = useState();
    const navigation = useNavigation();

    const handleEmailLogin = async () => {
        if (!email || !password || !role) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        const data = { email, password, role };
        try {
            const response = await axios.post('http://172.17.0.1:8000/api/login', data);
            console.log(response.data);
            if (response.data.success) {
                const userObject = {
                    token: response.data.user.token,
                    email: response.data.user.email,
                    role: response.data.user.role
                };

                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Success!',
                    text2: 'User is logged in.',
                });

                await AsyncStorage.setItem('user', JSON.stringify(userObject));
                navigation.navigate("HomeScreen");
            } else {
                Alert.alert('Login Failed', response.data.error || 'Invalid credentials');
            }
        } catch (error) {
            console.error('Login Error:', error);
            Alert.alert('Error', 'Unable to log in. Please try again later.');

        }
    };

    return (
        <View style={tw`flex-1 justify-center items-center p-5 bg-white`}>
            <View style={tw`w-24 h-24 mb-10`}>
                <Image source={require("../../assets/carcarelogo.png")} style={tw`w-full h-full`} />
            </View>
            <Text style={tw`text-2xl font-bold mb-5`}>Login</Text>
            <TextInput
                style={tw`w-full p-3 mb-3 border border-gray-300 rounded bg-white`}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={tw`w-full p-3 mb-3 border border-gray-300 rounded bg-white`}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />


            <View style={tw`flex flex-row align-middle justify-center`}>

                <Text>Role</Text>

                <CheckBox
                    title="Owner"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={role === 'owner'}
                    onPress={() => setRole('owner')}
                    containerStyle={tw`bg-transparent border-0`}
                />
                <CheckBox
                    title="Washer"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={role === 'washer'}
                    onPress={() => setRole('washer')}
                    containerStyle={tw`bg-transparent border-0`}
                />

            </View>



            <TouchableOpacity style={tw`w-full p-4 bg-blue-600 rounded items-center my-2`} onPress={handleEmailLogin}>
                <Text style={tw`text-white text-lg font-bold`}>Login with Email</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={tw`text-blue-600`}>Don't have an account? Signup now!</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
