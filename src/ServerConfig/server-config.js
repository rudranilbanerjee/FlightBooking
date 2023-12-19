import Config from './config.js'
let stagingUrl = Config.staggingBaseUrl;
let staggingBaseApi = Config.staggingBaseApi;
let encryptedKey = Config.encryptedKey;
let apiKey = Config.apiKey;
let currency = Config.currency;
const serverConfig = {
    stagingUrl,
    staggingBaseApi,
    encryptedKey,
    apiKey,
    currency
};
export default serverConfig;