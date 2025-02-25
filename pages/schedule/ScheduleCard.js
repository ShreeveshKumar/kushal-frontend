import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ScheduleCard = () => {
    const [data, setData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchTaskInfo = async () => {
            try {
                const token = await AsyncStorage.getItem("user");
                const user = JSON.parse(token);
                const response = await axios.get("https://kushal-backend.onrender.com/api/user/get-tasks", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                console.log(response.data.tasks);
                setData(response.data.tasks);
            } catch (err) {
                console.log("Error fetching tasks:", err.message);
            }
        };

        fetchTaskInfo();
    }, []);

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>Scheduled Tasks</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()} 
                renderItem={({ item }) => <TaskCard task={item} navigation={navigation} />}
            />
        </View>
    );
};

const TaskCard = ({ task, navigation }) => {
    return (
        <View
            style={{
                backgroundColor: "#fff",
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 3,
            }}
        >
            <View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Task Details</Text>
                <Text>🗓️ Day: {task.formData?.day || "N/A"}</Text>
                <Text>🔄 Occurrence: {task.formData?.occurrence || "N/A"}</Text>
                <Text>⏳ Slot: {task.formData?.slot || "N/A"}</Text>
                <Text>📍 Special Area: {task.formData?.specialArea || "N/A"}</Text>
                {task.formData?.vehicle && <Text>🚗 Vehicle: {task.formData?.vehicle}</Text>}
                <Text>📌 Status: {task.status}</Text>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate("TaskDetails", { task })}
                style={{
                    backgroundColor: "#007bff",
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                }}
            >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>View Details</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ScheduleCard;
