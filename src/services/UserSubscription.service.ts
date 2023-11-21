import axiosInstance from "../utils/axiosInstance";

export const getUserSubscription = async(userId:string)=>{
    const resp = await axiosInstance.get('UserSubscription/check/'+userId);

    return resp.data;
}