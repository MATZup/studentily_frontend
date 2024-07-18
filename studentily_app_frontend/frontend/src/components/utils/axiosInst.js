import axios from "axios";

const BASE_URL = "https://studentily-backend.onrender.com";

const axiosCall = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosCall.interceptors.request.use(
  (config) => {
    const secretToken = localStorage.getItem("token");
    if (secretToken) {
      config.headers.Authorization = `Bearer ${secretToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosCall;
