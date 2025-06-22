export const CONFIG = { JWT: "", REFRESH_JWT: '' };
export const AUTH_API_BASE_URL = "https://dummyjson.com";
export const API_TIMEOUT = 30000;

export const NEWS_API_KEY = "3134889ccb2a343cb28627fbe0de244d"; //Mediastack key
export const NEWS_API_BASE_URL = "http://api.mediastack.com/v1/";

export const TECH_CATEGORIES = {
    'AI': ['AI', 'Artificial Intelligence', 'OpenAI', 'ChatGPT', 'Gemini', 'LLM', 'DeepMind'],
    'Software': ['Software', 'Microsoft', 'Windows', 'Linux', 'App', 'Developer', 'Programming'],
    'Hardware': ['Hardware', 'Apple', 'NVIDIA', 'Intel', 'AMD', 'Mac', 'iPhone', 'Chip', 'Processor'],
    'Security': ['Security', 'Cybersecurity', 'Hack', 'Vulnerability', 'Privacy', 'Data Breach'],
};

export const SESSION_KEYS = Object.freeze({
  AUTH: "auth"
});

export const apiEndpoints = Object.freeze({
  LOGIN_URL: "/auth/login",
  GET_CURRENT_USER: "/auth/me",
  REFRESH: "/auth/refresh",
  REGISTER_URL: "/users/add",
  NEWS: "news",
});

export const Service = Object.freeze({
  AUTH: 0,
});