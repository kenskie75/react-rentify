import React, { useCallback, useEffect, useState } from 'react'
import { getDataFromStorage } from '../../utils/storage';
import { getDriverByOwner } from '../../services/DriverService.service';

export default function useGetDriversByOwner() {
    const [data,setData] = useState<any[]>([]);
    
    const sendRequest = useCallback(
      async() => {
        try {
           const user = await getDataFromStorage('account');

           if(!user){
            return;
           }

           const resp = await getDriverByOwner(user?.user_id);

           setData(resp.data);
        } catch (error) {
            console.log(error)
        }
      },
      [],
    )
    
    useEffect(() => {
      sendRequest();
    }, [])
    
    
    return {
        data
    }
}
