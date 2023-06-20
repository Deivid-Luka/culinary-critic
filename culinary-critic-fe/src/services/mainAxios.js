import axios from "axios";

export const mainAxios = new axios.create({
    baseURL: 'http://localhost:8080'
});