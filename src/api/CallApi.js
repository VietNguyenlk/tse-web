import axios from "axios";

var api = axios.create({
    baseURL:'http://localhost:8987/api/v1/auth'
})

export const postApi=(url,data)=>{
    return api.post(url,data)
}