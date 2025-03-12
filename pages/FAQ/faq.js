import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

const FAQScreen = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <WebView source={{ uri: 'http://192.168.29.141:8000/faq' }} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default FAQScreen;
