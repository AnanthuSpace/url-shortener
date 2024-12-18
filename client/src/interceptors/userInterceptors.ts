import axios from "axios";
const localhostURL = import.meta.env.VITE_LIVE_URL

const userAxiosInstance = axios.create({
    baseURL: localhostURL
})

userAxiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = sessionStorage.getItem("accessToken")
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

userAxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = sessionStorage.getItem("refreshToken");
            try {
                const response = await axios.post(`${localhostURL}/auth/refresh-token`, { refreshToken });
                const newAccessToken = response.data.accessToken;
                sessionStorage.setItem("accessToken", newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("refreshToken");
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default userAxiosInstance;