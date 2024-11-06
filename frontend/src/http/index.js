import axios from 'axios'


const BASE_URL = 'http://127.0.0.1:8000/'
const $api = axios.create({
    baseURL: BASE_URL, 
});

if (localStorage.getItem('silantToken')) {
    $api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('silantToken')}`
        return config;
    })
}

export default $api;