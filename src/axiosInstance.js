import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    Authorization: "Bearer my_secret_token",
  },
});

export default axiosInstance;
