import axios from "axios";

const key = import.meta.env.VITE_API_KEY;
const path = import.meta.env.VITE_BASE_PATH;
const url = import.meta.env.VITE_BASE_URL;
const host = import.meta.env.VITE_BASE_HOST;

export const request = axios.create({
  baseURL: `${url}/${path}`,
  params: {
    base64_encoded: 'true',
    fields: '*'
  }
});

request.defaults.headers.post["Content-Type"] = "application/json";
request.defaults.headers['x-rapidapi-key'] = `${key}`;
request.defaults.headers['x-rapidapi-host'] = `${host}`;
request.defaults.headers["Accept"] = "application/json";
