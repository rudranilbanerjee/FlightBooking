import axios from 'axios';
import serverConfig from './../ServerConfig/server-config' ;
import CryptoJS from 'crypto-js';
const {staggingBaseApi, encryptedKey, apiKey, currency}= serverConfig;

const FlightBookApi = (config) => {
    const token = localStorage.getItem('JWT-KEY');
    config.baseURL = staggingBaseApi;
    config.headers = {
        // SecurityCode: token,
        'Content-Type': 'application/json',
        apikey: apiKey,
        currency:currency
    }
    return axios(config);
}
const encryptRequestBody = (data) => {
    // Implement your encryption logic here
    // This is a placeholder, replace it with your actual encryption code
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), encryptedKey).toString();
    return encrypted;
};

axios.interceptors.response.use(null, (error) => {
    const expectedError = error.response?.status === 401;
    if (expectedError) {
        window.location.href = '/';
        localStorage.clear();
    }
    return Promise.reject(error.response?.data.status.errorMessage);
});
export default FlightBookApi;
export {encryptRequestBody};
