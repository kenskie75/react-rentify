import { useCallback, useEffect, useState } from 'react'
import { getBookingByCustomer } from '../../services/BookingsService.service'
import { getDataFromStorage } from '../../utils/storage'

export default function useGetBookingByCustomerId() {
  const [data,setData] = useState<any[]>([])
    
  const sendRequest = useCallback(
    async() => {
      try {
        const user = await getDataFromStorage('account');
        if(!user){
            return;
        }
        const response = await getBookingByCustomer(user?.user_id);

        setData(response.data);
      } catch (error) {
        
      }
    },
    [],
  )
  
  useEffect(() => {
    sendRequest();
  }, [])
  
  return {
    data,
    sendRequest
 }
}
