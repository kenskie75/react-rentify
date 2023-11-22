import axiosInstance from "../utils/axiosInstance";

export const uploadImage = async(payload:any) =>{
    const resp = await axiosInstance.post('VehicleImage/upload',payload,{headers:{
        "Content-Type":"multipart/form-data"
    }});

    return resp.data;
}

export const getImage = async(nonce:string)=>{
    const resp = await axiosInstance.get(`VehicleImage/getimage/${nonce}`);

    return resp.data;
}