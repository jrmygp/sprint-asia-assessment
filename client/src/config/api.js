import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8888",
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
