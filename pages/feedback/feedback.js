import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const FeedbackScreen = () => {
    return (
        <View style={styles.container}>
            <WebView source={{ uri: 'http://192.168.29.141:8000/rating' }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default FeedbackScreen;
