import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor
instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default instance;