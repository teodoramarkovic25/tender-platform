import axios from "axios";
import jwtDecode from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL;
const API_VERSION = process.env.REACT_APP_API_VERSION;

const axiosInstance = axios.create({
  baseURL: `${API_URL}/${API_VERSION}`
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    };
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      window.location.href = "/sign-in";
    }

    return Promise.reject(error);
  }
);

const getAccessToken = () => {
  return localStorage.getItem('jwt_access_token');
};


export default axiosInstance;
