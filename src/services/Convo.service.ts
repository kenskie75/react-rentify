import axiosInstance from "../utils/axiosInstance"

export const createConvo = async(payload:any) =>{
    const resp = await axiosInstance.post('convo/create',payload,{headers:{'Content-Type':'text/plain'}})

    return resp.data;
}

export const getConvo = async(id:string,type:string)=>{
    const resp = await axiosInstance.get(`convo/convos/${id}/${type}`);

    return resp.data;
}