import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const FAQScreen = () => {
    return (
        <View style={styles.container}>
            <WebView source={{ uri: 'http://192.168.28.243:8000/faq' }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default FAQScreen;
