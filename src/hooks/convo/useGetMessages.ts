import React, { useCallback, useEffect, useState } from 'react'
import { getMessages } from '../../services/Message.service';
import useAlertOption from '../useAlertOption';

type Props = {
    convoId:string;
}
export default function useGetMessages(props:Props) {
    const {alertError} = useAlertOption();
    const [data,setData] = useState<any[]>([]);
    const sendRequest = useCallback(async(convoId:string)=>{
        try {
            const resp = await getMessages(convoId);     
            
            setData(resp.data);
        } catch (error) {
            alertError();
        }
    },[]);
  
    useEffect(()=>{
        sendRequest(props.convoId);
    },[props.convoId])
    
    return {
        sendRequest,
        data
    }
}
