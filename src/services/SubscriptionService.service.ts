import axiosInstance from "../utils/axiosInstance";

const headers = {
    "Content-Type":'text/plain'
}
export const getSubscription = async() =>{
    const resp = await axiosInstance.get('Subscription/subscriptions');

    return resp.data;
}

export const createSubscription = async (payload:any) =>{
    const resp = await axiosInstance.post('Subscription/create',payload,{headers});


    return resp.data;
}