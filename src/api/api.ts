import axios from "axios";
import { SERVER_HOST } from "@/shared/link/SERVER_LINKS";

const api = axios.create({
  baseURL: SERVER_HOST, 
  timeout: 5000,                     
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;