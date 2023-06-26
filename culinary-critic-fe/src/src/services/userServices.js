import { mainAxios } from "./mainAxios";

export const postLogin = async (username, password) => {
    const response = await mainAxios.post('/public/login', {username, password});
    return response
}