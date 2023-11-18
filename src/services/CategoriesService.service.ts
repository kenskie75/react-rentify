import axiosInstance from "../utils/axiosInstance";

const headers = {
    "Content-Type":"text/plain"
}


export const getCategories = async()=>{
    const resp = await axiosInstance.get('Categories/categories');

    return resp.data;
}

export const addCategory = async(payload:any)=>{
    const resp = await axiosInstance.post(`Categories/create`,payload,{headers});

    return resp.data;
}