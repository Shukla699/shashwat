import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: false
});

// Request interceptor
instance.interceptors.request.use(
    (config) => {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        console.error('❌ Request error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
instance.interceptors.response.use(
    (response) => {
        console.log(`✅ API Response: ${response.status} from ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error('❌ API Error:', {
            url: error.config?.url,
            status: error.response?.status,
            message: error.response?.data?.error || error.message,
            data: error.response?.data
        });
        
        // Handle network errors
        if (!error.response) {
            console.error('🌐 Network Error: Backend server might be down');
        }
        
        return Promise.reject(error);
    }
);

export default instance;