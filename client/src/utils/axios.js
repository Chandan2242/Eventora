import axios from "axios";

const RENDER_API =
    import.meta.env.VITE_API_URL ||
    "https://eventorabackend-hp4g.onrender.com/api";

const LOCAL_API = "http://localhost:5000/api";

const api = axios.create({
    baseURL: RENDER_API,
    timeout: 7000,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            originalRequest &&
            !originalRequest._localRetry &&
            (
                error.code === "ERR_NETWORK" ||
                error.code === "ECONNABORTED"
            )
        ) {
            originalRequest._localRetry = true;
            originalRequest.baseURL = LOCAL_API;

            console.log("⚠️ Render unavailable → trying localhost");

            return api.request(originalRequest);
        }

        return Promise.reject(error);
    }
);

export default api;