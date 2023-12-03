import { useCallback, useEffect, useState } from 'react'
import useAlertOption from '../useAlertOption';
import { getConvo } from '../../services/Convo.service';
import { getDataFromStorage } from '../../utils/storage';

export default function useGetConvo() {
  
    const [data,setData] = useState<any[]>([]);
    const {alertError} = useAlertOption();

    const sendRequest = useCallback(async()=>{
        try {
            const user = await getDataFromStorage('account');
            if(!user){
                return;
            }

            const type = user.user_type ? user.user_type : 'DRIVER';
            
            const resp = await getConvo(user.user_id,type);
            
            setData(resp.data);
        } catch (error) {
            alertError();
        }
    },[]);

    useEffect(() => {
      sendRequest();
    }, [])
    

    return {
        data,
        sendRequest
    }
}
