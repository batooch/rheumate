import api from "@/services/apiService.tsx";


export const getTodayData = async () => {

    try {
        const response = await api.get("http://localhost:9095/question-completed/stats/today");
        return response.data;

    } catch (err: unknown) {
        console.error("get fehlgeschlagen")
    }

};


export const getStreakData = async () => {

    try {
        const response = await api.get("http://localhost:9095/question-completed/stats/streak");
        return response.data;

    } catch (err: unknown) {
        console.error("get fehlgeschlagen")
    }

};

