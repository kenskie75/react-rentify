import axiosInstance from "../utils/axiosInstance";

export const getNotifications = async(userId:string)=>{
    const resp = await axiosInstance.get(`notification/notifications/${userId}`);

    return resp.data;
}