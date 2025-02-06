import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import axios from 'axios';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [username, setname] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState('washer');

    const handleRoleChange = (role) => {
        setChecked(role);
    };

    const [data, setData] = useState({
        username: username,
        email: email,
        password: password,
        role: checked,
    });

    const handleEmailSignup = () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }
console.log(data);

        axios.post("http://172.17.0.1:8000/api/signup", data)
            .then((response) => {
  
                if (response.data) {
                    AsyncStorage.removeItem("token");
                   navigation.navigate("Login")
                }
            }).catch((error) => {
                console.log("Error:", error);
            });
    };

    useEffect(() => {
        setData({
            username: username,
            email: email,
            password: password,
            role: checked,
        });
    }, [username, email, password, checked]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

            <TextInput
                style={styles.input}
                placeholder="username"
                onChangeText={setname}
                value={username}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry
            />

            <View style={styles.radioContainer}>
                <View style={styles.radioOption}>
                    <RadioButton
                        value="washer"
                        status={checked === 'washer' ? 'checked' : 'unchecked'}
                        onPress={() => handleRoleChange('washer')}
                    />
                    <Text style={styles.optionText}>Washer</Text>
                </View>
                <View style={styles.radioOption}>
                    <RadioButton
                        value="owner"
                        status={checked === 'owner' ? 'checked' : 'unchecked'}
                        onPress={() => handleRoleChange('owner')}
                    />
                    <Text style={styles.optionText}>Owner</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleEmailSignup}>
                <Text style={styles.buttonText}>Sign Up with Email</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign Up with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign Up with Facebook</Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => { navigation.navigate("Login") }}>
                <Text>Already a User ? Login here </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#0066cc',
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    optionText: {
        fontSize: 16,
    },
});

export default SignupScreen;
