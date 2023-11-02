import axios from 'axios';
import { configVariable } from '../constant/ConfigVariable';

console.log(configVariable.BASE_URL);
const axiosInstance = axios.create({
    baseURL:configVariable.BASE_URL
});

export default axiosInstance;