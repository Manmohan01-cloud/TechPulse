import axios from "axios";
import {
  API_TIMEOUT,
  AUTH_API_BASE_URL,
  CONFIG,
  PRODUCT_API_BASE_URL,
  Service
} from "../constants/appContants";

export const getToken = () => {
  return CONFIG.JWT;
};

export const setToken = (accessToken, refreshToken) => {
  CONFIG.JWT = accessToken;
  CONFIG.REFRESH_JWT = refreshToken;
};

export const getBaseURLByService = service => {
  switch (service) {
    case Service.AUTH:
      return AUTH_API_BASE_URL;
      break;
    case Service.PRODUCT:
      return PRODUCT_API_BASE_URL;
      break;

    default:
      throw new Error("No matching Service Found.");
  }
};

export const getApiClient = (
  { auth, service } = { auth: true, sericeApi: Service.AUTH }
) => {
  const baseURL = getBaseURLByService(service);
  const client = axios.create({
    baseURL,
    timeout: API_TIMEOUT,
    headers: {
      "Content-Type": "application/json"
    }
  });

  client.interceptors.request.use(
    function(config) {
      const configIntercepted = { ...config };
      if (auth) {
        const AUTH_TOKEN = getToken();
        configIntercepted.headers.set("Authentication", `Bearer ${AUTH_TOKEN}`);
        configIntercepted.headers.set("Authorization", `Bearer ${AUTH_TOKEN}`);
      }
      console.log("Request Interceptor...");

      return configIntercepted;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    function(response) {
      console.log("====================================");
      console.log("====================================");
      return response;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  return client;
};
