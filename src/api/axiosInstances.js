import Cookies from 'js-cookie';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:3000/v1';

const baseAPI = axios.create({ baseURL: baseUrl });

baseAPI.interceptors.request.use(async (config) => {
  const userToken = Cookies.get('bookADocUserToken');
  // If userToken exists, set 'Authorization' and 'x-access-token' headers to the user token
  if (userToken) {
    config.headers['Authorization'] = `Bearer ${userToken}`;
    config.headers['x-access-token'] = userToken;
  }

  return config;
});

export default baseAPI;
