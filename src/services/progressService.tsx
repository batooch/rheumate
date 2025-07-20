import api from "@/services/apiService.tsx";


export const getProgress = async () => {

    try {
        const response = await api.get("/question-progress/now");
        console.log("data:", response.data.progress);
        return response.data.progress;


    } catch (err: unknown) {
        console.error("get fehlgeschlagen")
    }

};


