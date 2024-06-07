import axios from 'axios';

const BASE_URL = 'https://api.gemx.io/api/miniapp';

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

const axiosAuth = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export { axiosAuth };
export default axiosClient;
