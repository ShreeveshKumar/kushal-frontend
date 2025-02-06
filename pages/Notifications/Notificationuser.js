import { View, Text, FlatList } from 'react-native';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

dayjs.extend(relativeTime);

const Notificationuser = () => {


    


    const [notification, setNotification] = useState([
        { id: 1, message: "Order shipped", timestamp: "2025-01-27T10:00:00Z" },
        { id: 2, message: "New message received", timestamp: "2025-01-28T08:30:00Z" },
        { id: 3, message: "Payment successful", timestamp: "2025-01-25T14:15:00Z" },
        { id: 4, message: "Password changed", timestamp: "2025-01-20T16:00:00Z" },
    ]);

    const [groupedNotifications, setGroupedNotifications] = useState({});

    const groupByTime = () => {
        const today = dayjs().startOf("day");
        const yesterday = dayjs().subtract(1, "day").startOf("day");
        const thisWeek = dayjs().startOf("week");

        const groups = {
            Today: [],
            Yesterday: [],
            Week: [],
            Earlier: [],
        };

        notification.forEach((notification) => {
            const notificationTime = dayjs(notification.timestamp);
            if (notificationTime.isSame(today, "day")) {
                groups.Today.push(notification);
            } else if (notificationTime.isSame(yesterday, "day")) {
                groups.Yesterday.push(notification);
            } else if (notificationTime.isSame(thisWeek, "week")) {
                groups.Week.push(notification);
            } else {
                groups.Earlier.push(notification);
            }
        });

        setGroupedNotifications(groups);
    };

    useEffect(() => {
        groupByTime();
    }, [notification]);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    };

    // Render grouped notifications
    const renderSection = (section) => {
        const items = groupedNotifications[section];
        if (!Array.isArray(items) || items.length === 0) return null;
        return (
            <View key={section} style={tw`mb-4`}>
                <Text style={tw`text-xl font-semibold mb-2`}>{section}</Text>
                {items.map((item) => (
                    <View key={item.id} style={tw`p-4 bg-white rounded-lg shadow-md mb-2`}>
                        <Text style={tw`text-base`}>{item.message}</Text>
                        <Text style={tw`text-sm text-gray-500`}>{formatTimestamp(item.timestamp)}</Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <SafeAreaView style={tw`p-4`}>
            <View>
                {Object.keys(groupedNotifications).map((section) => renderSection(section))}
            </View>
        </SafeAreaView>
    );
};

export default Notificationuser;
