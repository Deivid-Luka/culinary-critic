import axios from "axios";
import {getStore} from "../AppContext";

export const mainAxios = new axios.create({
    baseURL: 'http://localhost:8080'
});

export const setAuthToken = (token) => {
    if (token) {
        //applying token
        mainAxios.defaults.headers["Authorization"] = "Bearer " + token;
    } else {
        //deleting the token from header
        delete mainAxios.defaults.headers["Authorization"];
    }
};

mainAxios.interceptors.request.use(
    (request) => {

        console.log({ request })
        const {
            user: [user]
        } = getStore();
        console.log({ [request?.data?.object + "Request"]: request });
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

mainAxios.interceptors.response.use(
    (response) => {
        if (response?.data?.status === false) {
        }
        return response;
    },
    (error) => {
        const {
            user: [, setUser],
        } = getStore();
        if (error.response?.status === 401) {
            document.cookie =
                "cc-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setUser(null);
            setAuthToken(null);
        } else if (error.response?.status === 423) {
            return error;
        } else if (error.response?.status === 403) {
            console.log({ error })
            document.cookie =
                "cc-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setUser(null);
            setAuthToken(null);
        } else {
            console.log({ error })
            let message = error.toJSON ? error.toJSON().message : error.message;
            console.log({message})
        }

        return Promise.reject(error);
    }
);