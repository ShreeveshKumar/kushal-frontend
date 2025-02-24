import { get } from "services/apiService";

const getUserTasks = async () => {
    try {
        const response = await get("/user/get-tasks");
        const result = response.data; 
        return result; 
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return null; 
};
}

export default getUserTasks;
