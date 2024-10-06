import axios from "axios";


var api = axios.create({
    baseURL:'http://localhost:3008/api/v1/auth'
})

var apiUser = axios.create({
    baseURL:'http://localhost:3008/api/v1/users'

})

export const postApi=(url,data)=>{
    return api.post(url,data)
}

export const getApiUser = (url, config = {}) => {
    return apiUser.get(url, config); // truyền thêm config nếu có (headers, params, etc.)
  };