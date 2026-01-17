import axios from 'axios';
import { Alert } from 'react-native';
import { API_CONFIG } from './constants';

export const apiClient = axios.create({
  timeout: API_CONFIG.TIMEOUT,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log('API Error', `Status: ${error.response.status}`);
    } else if (error.request) {
      Alert.alert('Network Error', error.message);
    } else {
      Alert.alert('Request Error', error.message);
    }
    return Promise.reject(error);
  }
);
