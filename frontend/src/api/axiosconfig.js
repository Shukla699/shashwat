import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false
});

// Request interceptor
instance.interceptors.request.use(
    (config) => {
        console.log('Making request to:', config.baseURL + config.url);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
instance.interceptors.response.use(
    (response) => {
        console.log('Response received:', response.status, 'from', response.config.url);
        return response;
    },
    (error) => {
        console.error('API Error:', {
            url: error.config?.url,
            status: error.response?.status,
            message: error.response?.data?.error || error.message
        });
        return Promise.reject(error);
    }
);

export default instance;