import axiosInstance from "../utils/axiosInstance"

export const getMessages = async(convoId:string)=>{
    const resp = await axiosInstance.get(`messages/messages/${convoId}`)

    return resp.data;
}

export const sendMessage = async(payload:any)=>{
    const resp = await axiosInstance.post('messages/send',payload,{headers:{'Content-Type':'text/plain'}})

    return resp.data;
}