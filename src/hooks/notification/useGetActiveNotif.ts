import { useCallback, useEffect, useState } from "react";
import useAlertOption from "../useAlertOption";
import { getActiveNotifications } from "../../services/Notification.service";
import { getDataFromStorage } from "../../utils/storage";

export default function useGetActiveNotif() {
    const [data,setData] = useState<any[]>([]);
    const {alertError} = useAlertOption();

    const sendRequest = useCallback(
      async() => {
        try {
            const user = await getDataFromStorage('account');
            if(!user){
                return;
            }
            const resp = await getActiveNotifications(user.user_id);

            setData(resp.data);
        } catch (error) {
            alertError();    
        }
      },
      [],
    );

    useEffect(() => {
      sendRequest();
    }, [])
    
    
    return {
        data,
        sendRequest
  }
}
