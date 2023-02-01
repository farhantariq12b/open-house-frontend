import axios from "axios";

export const BASE_API_URL = process.env.VUE_APP_API_GATEWAY_URL + "/api/v1";

export const authInterceptor = [
  config => {
    const token = localStorage.getItem('token') || null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
];

export const Service = url =>
  axios.create({
    baseURL: BASE_API_URL + url
  });

export const AuthorizedService = url => {
  const authorizedService = Service(url);
  authorizedService.interceptors.request.use(...authInterceptor);
  return authorizedService;
};
