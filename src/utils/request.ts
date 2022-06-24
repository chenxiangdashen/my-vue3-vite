import axios from "axios";
import { TOKEN } from "./static";
import { getToken } from "./token";

const token = getToken();

const service = axios.create({
    baseURL: import.meta.env.BASE_URL,
    timeout:20000,
    headers:{
        [TOKEN]: token
    }
})

service.interceptors
