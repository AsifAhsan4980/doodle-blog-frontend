import axios from "axios";
import {api} from "../utils/config";

const register = (data: any) => {
    return axios.post(`${api}auth/register/`, data, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const login = (data: any) => {
    return axios.post(`${api}auth/`, data, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const Auth = {
    register,
    login
}

export default Auth