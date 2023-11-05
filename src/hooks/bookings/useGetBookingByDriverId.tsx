import  { useCallback, useEffect, useState } from 'react'
import {  getDataByDriverId } from '../../services/BookingsService.service';
import { getDataFromStorage } from '../../utils/storage';

export default function useGetBookingByDriverId() {
    const [data,setData] = useState<any[]>([]);
  
    const sendRequest = useCallback(
      async() => {
        try {
            const user = await getDataFromStorage('account');
            if(!user){
                return;
            }
            const response = await getDataByDriverId(user?.driver_id);


            setData(response.data);
        } catch (error) {
            
        }
      },
      [],
    )

    useEffect(() => {
      sendRequest();
    }, [])
    
    
    return{
        data
  }
}
