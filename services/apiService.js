import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

const api = axios.create
    ({
        baseURL: process.env.BASE_URL,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
        },
    })

api.interceptors.request.use(
    async (config) => {
        const userdata = await SecureStore.getItemAsync("user");
        const user = JSON.parse(userdata) || null;
        
        if (user) {
            console.log("token found", user.token);
            if (user.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        }

        return config;

    }, (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const get = (url, params = {}) => api.get(url, { params });
export const post = (url, data = {}) => api.post(url, data);
export const put = (url, data = {}) => api.put(url, data);
export const del = (url) => api.delete(url);

export default api; 