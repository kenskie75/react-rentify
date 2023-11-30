import { useCallback, useEffect, useState } from 'react';
import useAlertOption from '../useAlertOption';
import { getNotifications } from '../../services/Notification.service';
import { getDataFromStorage } from '../../utils/storage';

export default function useGetNotifications() {
    const [data,setData] = useState<any[]>([]);
    const {alertError,alertSuccess} = useAlertOption();

    const sendRequest = useCallback(async()=>{
        try {
            const user = await getDataFromStorage('account');
            if(!user){
                return;
            }
            const resp = await getNotifications(user.user_id);

            setData(resp.data);
        } catch (error) {
            console.log(error);
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
