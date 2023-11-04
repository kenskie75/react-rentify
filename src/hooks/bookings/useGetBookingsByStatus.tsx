import { useCallback, useEffect, useState } from 'react';
import { getBookingByStatus } from '../../services/BookingsService.service';
import useAlertOption from '../useAlertOption';
import { getDataFromStorage } from '../../utils/storage';

type Params = {
    status:string;
}

export default function useGetBookingsByStatus(props:Params) {
    const [data,setData] = useState<any>([]);
    const {status} = props;
    const {alertError} = useAlertOption();

    const sendRequest = useCallback(
      async() => {
        try {
          const user = await getDataFromStorage('account');
            if(!user){
                return;
            }
            const response = await getBookingByStatus(user.user_id,status);

            setData(response.data);
        } catch (error) {
            alertError();
        }
      },
      [status],
    )
    
  
    useEffect(() => {
      sendRequest();
    }, [])
    
    return {
       data 
    }
}
