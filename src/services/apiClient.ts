import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const BASE_URL_STORAGE = process.env.NEXT_PUBLIC_STORAGE_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const isAxiosError = axios.isAxiosError;

export default apiClient;
