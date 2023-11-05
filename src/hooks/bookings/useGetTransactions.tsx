import React, { useCallback, useEffect, useState } from 'react'
import { getDataFromStorage } from '../../utils/storage';
import { getTransactionsByOwner } from '../../services/BookingsService.service';

export default function useGetTransactions() {
    const [data,setData] = useState<any[]>([]);
    
    const sendRequest = useCallback(
      async() => {
        try {
            const user = await getDataFromStorage('account');
            if(!user){
                return;
            }

            const resp = await getTransactionsByOwner(user?.user_id);
            
            setData(resp.data);
        } catch (error) {
            
        }
      },
      [],
    )
    

    useEffect(() => {
      sendRequest();
    }, [])
    
    return{
        data,
        sendRequest
    }
}
