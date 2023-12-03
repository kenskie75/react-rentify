import axiosInstance from "../utils/axiosInstance"

export const createRating = async(payload:any)=>{
    const resp = await axiosInstance.post(`rating/create`,payload,{headers:{'Content-Type':'text/plain'}});

    return resp.data;
}