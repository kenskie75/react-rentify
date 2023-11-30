import axiosInstance from "../utils/axiosInstance";

export const getNotifications = async(userId:string)=>{
    const resp = await axiosInstance.get(`notification/notifications/${userId}`);

    return resp.data;
}

export const getActiveNotifications = async(userId:string)=>{
    const resp = await axiosInstance.get(`notification/getactive/${userId}`);

    return resp.data;
}

export const updateNotificationStatus = async(payload:any)=>{
    const resp = await axiosInstance.post(`notification/updatestatus`,payload,{headers:{'Content-Type':'text/plain'}});

    return resp.data;
}