import axios from "axios";
import {api} from "../utils/config";

const payment = (data: any) => {
    return axios.post(`${api}test/fiserv/`, data, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const payPatch = (data: any) => {
    console.log('sa',data)
    return axios.patch(`${api}test/fiserv/${data.tid}`, {}, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const TreeDSPost = (url, data: any) => {
    console.log('sa',data)
    return axios.post(url, data, {
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const Fiserv = {
    payment,
    payPatch,
    TreeDSPost
}

export default Fiserv