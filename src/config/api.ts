import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'https://mikes-virtual-lab.vercel.app';
const api = axios.create({baseURL: BASE_URL,});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('access_token');
  if(token){
    config.headers.access_token = token;
  }
  return config;
});

export default api;