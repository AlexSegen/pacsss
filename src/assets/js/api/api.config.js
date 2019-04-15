import axios from "axios";
import config from '../config'

const axiosInstance = axios.create({
  baseURL: config.API,
  timeout: 5000
});

export default axiosInstance;
