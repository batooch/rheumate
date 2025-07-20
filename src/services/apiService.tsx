// src/api.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:9095",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    console.log("Token wird gesendet:", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
