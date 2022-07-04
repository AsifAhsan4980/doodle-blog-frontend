import axios from "axios";
import {api} from '../utils/config';

const postBlog = (data: any) => {
    return axios.post(`${api}blog/`, data, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const getBlog = () => {
    return axios.get(`${api}blog/`, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const getOneBlog = (id: any) => {
    return axios.get(`${api}blog/${id}`, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const updateBlog = (id: any, data: any) => {
    return axios.put(`${api}blog/${id}`, data, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const addComment = (data: any, id: any) => {
    return axios.put(`${api}blog/addComment/${id}/`, data, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const blog = {
    postBlog,
    getBlog,
    getOneBlog,
    updateBlog,
    addComment
}


export default blog