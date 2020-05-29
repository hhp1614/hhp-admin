import axios from 'axios';
import router from '../router';
import store from '../store';
import config from '../config';

// 创建 axios 实例
const service = axios.create({
  baseURL: config.baseURL,
  timeout: 15 * 1000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
});

// 请求拦截
service.interceptors.request.use(
  config => {
    store.dispatch('actionChangeLoading', true);
    if (localStorage.token) {
      config.headers.Authorization = 'Bearer ' + localStorage.token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  response => {
    store.dispatch('actionChangeLoading', false);
    const { data } = response;
    return data;
  },
  error => {
    store.dispatch('actionChangeLoading', false);
    const { status, data } = error.response || {};
    if (data) {
      store.dispatch('actionChangeMessage', { success: false, text: data.msg });
    }
    if (status === 401) {
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export const request = service;
